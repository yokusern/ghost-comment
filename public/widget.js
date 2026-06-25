(function () {
  'use strict';

  var script = document.currentScript;
  var projectId = script && script.getAttribute('data-project-id');
  if (!projectId) {
    console.warn('[GhostComment] data-project-id is required');
    return;
  }

  var API_BASE = 'https://ghost-comment-six.vercel.app';
  var position  = (script && script.getAttribute('data-position')) || 'right';
  var accentColor = (script && script.getAttribute('data-color')) || '#A78BFA';
  var promptText  = (script && script.getAttribute('data-prompt')) || null;
  var locale  = (script && script.getAttribute('data-locale')) || 'ja';
  var delayMs = parseInt((script && script.getAttribute('data-delay')) || '0', 10) * 1000;
  var device  = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

  // ── I18N ────────────────────────────────────────────────────────────────────
  var i18n = {
    ja: {
      title: 'フィードバックを送る',
      placeholder: '本音を聞かせてください…',
      submit: '送信する',
      submitting: '送信中…',
      thanksTitle: 'ありがとう！',
      thanksBody: 'あなたの声が開発者に届きました',
      ctaText: 'あなたのサイトにも導入する →',
      ariaLabel: 'フィードバックを送る',
    },
    en: {
      title: 'Send Feedback',
      placeholder: 'Tell us what you really think...',
      submit: 'Submit',
      submitting: 'Sending…',
      thanksTitle: 'Thank you!',
      thanksBody: 'Your voice reached the developer 👻',
      ctaText: 'Add this to your site →',
      ariaLabel: 'Send Feedback',
    },
  };
  var t = i18n[locale] || i18n['ja'];
  var defaultPrompt = promptText || t.placeholder;

  // ── Anonymous session fingerprint ────────────────────────────────────────────
  function sessionId() {
    var raw = [navigator.userAgent, screen.width, screen.height, Intl.DateTimeFormat().resolvedOptions().timeZone].join('|');
    var h = 0;
    for (var i = 0; i < raw.length; i++) {
      h = (Math.imul(31, h) + raw.charCodeAt(i)) | 0;
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }
  var sid = sessionId();

  // ── Styles ──────────────────────────────────────────────────────────────────
  var side = (position === 'left') ? 'left:20px;' : 'right:20px;';
  var panelSide = (position === 'left') ? 'left:16px;' : 'right:16px;';
  var css = [
    '#gc-btn{',
      'position:fixed;bottom:20px;' + side,
      'width:52px;height:52px;background:' + accentColor + ';',
      'border:none;border-radius:50%;cursor:pointer;z-index:2147483647;',
      'font-size:24px;box-shadow:0 4px 16px rgba(0,0,0,.25);',
      'transition:transform .2s,box-shadow .2s,opacity .3s;',
      'display:flex;align-items:center;justify-content:center;padding:0;',
      'opacity:0;pointer-events:none;',
    '}',
    '#gc-btn.gc-visible{opacity:1;pointer-events:all}',
    '#gc-btn:hover{transform:scale(1.08);box-shadow:0 6px 22px rgba(0,0,0,.3)}',
    '#gc-panel{',
      'position:fixed;bottom:84px;' + panelSide,
      'width:320px;background:#16162a;',
      'border:1px solid rgba(167,139,250,.25);border-radius:16px;padding:20px;',
      'z-index:2147483646;box-shadow:0 8px 32px rgba(0,0,0,.35);',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'transform:translateY(16px);opacity:0;pointer-events:none;',
      'transition:transform .22s ease,opacity .22s ease;',
    '}',
    '#gc-panel.gc-open{transform:translateY(0);opacity:1;pointer-events:all}',
    '#gc-panel *{box-sizing:border-box}',
    '.gc-title{color:#fff;font-size:14px;font-weight:600;margin:0 0 12px}',
    '.gc-emoji-row{display:flex;justify-content:space-between;margin-bottom:12px}',
    '.gc-emoji{',
      'font-size:22px;cursor:pointer;padding:4px 6px;border-radius:8px;',
      'border:2px solid transparent;transition:border-color .15s,background .15s;',
      'background:transparent;line-height:1;',
    '}',
    '.gc-emoji:hover{background:rgba(255,255,255,.08)}',
    '.gc-emoji.gc-sel{border-color:' + accentColor + ';background:rgba(167,139,250,.15)}',
    '.gc-textarea{',
      'width:100%;background:rgba(255,255,255,.06);',
      'border:1px solid rgba(255,255,255,.12);border-radius:10px;',
      'color:#fff;font-size:14px;padding:10px 12px;resize:none;height:88px;',
      'outline:none;font-family:inherit;transition:border-color .15s;',
    '}',
    '.gc-textarea::placeholder{color:rgba(255,255,255,.3)}',
    '.gc-textarea:focus{border-color:' + accentColor + '}',
    '.gc-submit{',
      'width:100%;margin-top:10px;background:' + accentColor + ';',
      'color:#fff;border:none;border-radius:10px;padding:10px;',
      'font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s;',
    '}',
    '.gc-submit:hover{opacity:.88}',
    '.gc-submit:disabled{opacity:.5;cursor:default}',
    '.gc-thanks{text-align:center;color:#fff;padding:12px 0 8px}',
    '.gc-thanks .gc-big{font-size:40px;display:block;margin-bottom:8px}',
    '.gc-thanks strong{display:block;margin-bottom:4px;font-size:15px}',
    '.gc-thanks p{margin:0 0 14px;font-size:13px;color:rgba(255,255,255,.5)}',
    '.gc-cta{',
      'display:block;text-align:center;',
      'color:rgba(255,255,255,.3);font-size:11px;',
      'text-decoration:none;padding:6px 0;',
      'transition:color .15s;',
    '}',
    '.gc-cta:hover{color:rgba(167,139,250,.8)}',
    '.gc-powered{text-align:center;margin-top:10px;font-size:11px;color:rgba(255,255,255,.2)}',
    '.gc-powered a{color:rgba(167,139,250,.45);text-decoration:none}',
    '.gc-powered a:hover{color:rgba(167,139,250,.8)}',
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Button ───────────────────────────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'gc-btn';
  btn.setAttribute('aria-label', t.ariaLabel);
  btn.textContent = '👻';
  document.body.appendChild(btn);

  // Show button after delay
  if (delayMs > 0) {
    setTimeout(function() { btn.classList.add('gc-visible'); }, delayMs);
  } else {
    btn.classList.add('gc-visible');
  }

  // ── Panel ────────────────────────────────────────────────────────────────────
  var panel = document.createElement('div');
  panel.id = 'gc-panel';
  panel.innerHTML =
    '<div id="gc-inner">' +
      '<p class="gc-title">' + t.title + '</p>' +
      '<div class="gc-emoji-row">' +
        ['😡','😕','😐','🙂','😍'].map(function(e, i) {
          return '<span class="gc-emoji" data-val="' + (i+1) + '">' + e + '</span>';
        }).join('') +
      '</div>' +
      '<textarea class="gc-textarea" placeholder="' + defaultPrompt + '" maxlength="1000"></textarea>' +
      '<button class="gc-submit">' + t.submit + '</button>' +
      '<div class="gc-powered">Powered by <a href="' + API_BASE + '" target="_blank" rel="noopener">Ghost Comment</a></div>' +
    '</div>';
  document.body.appendChild(panel);

  // ── State ────────────────────────────────────────────────────────────────────
  var isOpen = false;
  var selectedRating = null;

  var emojis = panel.querySelectorAll('.gc-emoji');
  emojis.forEach(function(el) {
    el.addEventListener('click', function() {
      emojis.forEach(function(e) { e.classList.remove('gc-sel'); });
      el.classList.add('gc-sel');
      selectedRating = parseInt(el.getAttribute('data-val'), 10);
    });
  });

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    panel.classList.toggle('gc-open', isOpen);
  });

  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && e.target !== btn) {
      isOpen = false;
      panel.classList.remove('gc-open');
    }
  });

  // ── Submit ───────────────────────────────────────────────────────────────────
  var submitBtn = panel.querySelector('.gc-submit');
  var textarea  = panel.querySelector('.gc-textarea');

  submitBtn.addEventListener('click', function() {
    var text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = t.submitting;

    fetch(API_BASE + '/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: projectId,
        text: text,
        rating: selectedRating,
        pageUrl: location.href,
        referrer: document.referrer || null,
        device: device,
        sid: sid,
      }),
    })
    .then(function() {
      var inner = panel.querySelector('#gc-inner');
      inner.innerHTML =
        '<div class="gc-thanks">' +
          '<span class="gc-big">👻</span>' +
          '<strong>' + t.thanksTitle + '</strong>' +
          '<p>' + t.thanksBody + '</p>' +
        '</div>' +
        '<a class="gc-cta" href="' + API_BASE + '" target="_blank" rel="noopener">' +
          t.ctaText +
        '</a>';
      setTimeout(function() {
        isOpen = false;
        panel.classList.remove('gc-open');
      }, 3500);
    })
    .catch(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = t.submit;
    });
  });
})();
