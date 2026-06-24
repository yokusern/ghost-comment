(function () {
  'use strict';

  var script = document.currentScript;
  var projectId = script && script.getAttribute('data-project-id');
  if (!projectId) {
    console.warn('[GhostComment] data-project-id is required');
    return;
  }

  var API_BASE = 'https://ghost-comment.vercel.app';
  var position = (script && script.getAttribute('data-position')) || 'right';
  var accentColor = (script && script.getAttribute('data-color')) || '#A78BFA';
  var promptText = (script && script.getAttribute('data-prompt')) || 'フィードバックを送る';
  var device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

  // Anonymous session fingerprint — no cookies, no PII
  // Hashes UA + screen resolution + timezone to a 8-char hex ID
  function sessionId() {
    var raw = [navigator.userAgent, screen.width, screen.height, Intl.DateTimeFormat().resolvedOptions().timeZone].join('|');
    var h = 0;
    for (var i = 0; i < raw.length; i++) {
      h = (Math.imul(31, h) + raw.charCodeAt(i)) | 0;
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }
  var sid = sessionId();

  // ── Styles ──────────────────────────────────────────────────────────────
  var css = [
    '#gc-btn{',
      'position:fixed;bottom:20px;' + (position === 'left' ? 'left:20px;' : 'right:20px;'),
      'width:52px;height:52px;background:' + accentColor + ';',
      'border:none;border-radius:50%;cursor:pointer;z-index:2147483647;',
      'font-size:24px;box-shadow:0 4px 16px rgba(0,0,0,.25);',
      'transition:transform .2s,box-shadow .2s;display:flex;',
      'align-items:center;justify-content:center;padding:0;',
    '}',
    '#gc-btn:hover{transform:scale(1.08);box-shadow:0 6px 22px rgba(0,0,0,.3)}',
    '#gc-panel{',
      'position:fixed;bottom:84px;' + (position === 'left' ? 'left:16px;' : 'right:16px;'),
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
    '.gc-thanks{text-align:center;color:#fff;padding:16px 0}',
    '.gc-thanks .gc-big{font-size:40px;display:block;margin-bottom:8px}',
    '.gc-thanks strong{display:block;margin-bottom:4px;font-size:15px}',
    '.gc-thanks p{margin:0;font-size:13px;color:rgba(255,255,255,.5)}',
    '.gc-powered{text-align:center;margin-top:12px;font-size:11px;color:rgba(255,255,255,.25)}',
    '.gc-powered a{color:rgba(167,139,250,.55);text-decoration:none}',
    '.gc-powered a:hover{color:rgba(167,139,250,.9)}',
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Button ───────────────────────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'gc-btn';
  btn.setAttribute('aria-label', 'フィードバックを送る');
  btn.textContent = '👻';
  document.body.appendChild(btn);

  // ── Panel ────────────────────────────────────────────────────────────────
  var panel = document.createElement('div');
  panel.id = 'gc-panel';
  panel.innerHTML =
    '<div id="gc-inner">' +
      '<p class="gc-title">' + promptText + '</p>' +
      '<div class="gc-emoji-row">' +
        ['😡','😕','😐','🙂','😍'].map(function(e, i) {
          return '<span class="gc-emoji" data-val="' + (i+1) + '">' + e + '</span>';
        }).join('') +
      '</div>' +
      '<textarea class="gc-textarea" placeholder="本音を聞かせてください…" maxlength="1000"></textarea>' +
      '<button class="gc-submit">送信する</button>' +
      '<div class="gc-powered">Powered by <a href="' + API_BASE + '" target="_blank" rel="noopener">Ghost Comment</a></div>' +
    '</div>';
  document.body.appendChild(panel);

  // ── State ────────────────────────────────────────────────────────────────
  var isOpen = false;
  var selectedRating = null;

  // emoji selection
  var emojis = panel.querySelectorAll('.gc-emoji');
  emojis.forEach(function(el) {
    el.addEventListener('click', function() {
      emojis.forEach(function(e) { e.classList.remove('gc-sel'); });
      el.classList.add('gc-sel');
      selectedRating = parseInt(el.getAttribute('data-val'), 10);
    });
  });

  // toggle
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    panel.classList.toggle('gc-open', isOpen);
  });

  // close on outside click
  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && e.target !== btn) {
      isOpen = false;
      panel.classList.remove('gc-open');
    }
  });

  // submit
  var submitBtn = panel.querySelector('.gc-submit');
  var textarea = panel.querySelector('.gc-textarea');

  submitBtn.addEventListener('click', function() {
    var text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = '送信中…';

    fetch(API_BASE + '/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: projectId,
        text: text,
        rating: selectedRating,
        pageUrl: location.href,
        device: device,
        sid: sid,
      }),
    })
    .then(function() {
      var inner = panel.querySelector('#gc-inner');
      inner.innerHTML =
        '<div class="gc-thanks">' +
          '<span class="gc-big">👻</span>' +
          '<strong>ありがとう！</strong>' +
          '<p>あなたの声が開発者に届きました</p>' +
        '</div>';
      setTimeout(function() {
        isOpen = false;
        panel.classList.remove('gc-open');
      }, 2800);
    })
    .catch(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = '送信する';
    });
  });
})();
