'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '@/lib/firebase'
import type { UserDoc } from '@/types'

interface AuthCtx {
  user: User | null
  userDoc: UserDoc | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx>({
  user: null, userDoc: null, loading: true,
  signIn: async () => {}, signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false) // auth確定で即座にloading解除。userDoc取得はブロックしない

      if (u) {
        const ref = doc(db, 'users', u.uid)
        getDoc(ref).then(async (snap) => {
          if (!snap.exists()) {
            const newDoc: UserDoc = {
              uid: u.uid,
              email: u.email || '',
              displayName: u.displayName || '',
              photoURL: u.photoURL || '',
              plan: 'free',
              createdAt: Date.now(),
            }
            await setDoc(ref, newDoc)
            setUserDoc(newDoc)
          } else {
            setUserDoc(snap.data() as UserDoc)
          }
        })
      } else {
        setUserDoc(null)
      }
    })
  }, [])

  const handleSignIn = async () => {
    await signInWithPopup(auth, googleProvider)
  }
  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <Ctx.Provider value={{ user, userDoc, loading, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => useContext(Ctx)
