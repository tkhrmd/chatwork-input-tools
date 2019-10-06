// ツールバーに便利アイコンを追加する
const addToolbarIcons = () => {
  const createElement = html => {
    const el = document.createElement('template');
    el.insertAdjacentHTML('beforeend', html);
    return el.firstElementChild;
  };

  const insert = (tag) => () => {
    const textarea = document.getElementById('_chatText');
    const cursor = textarea.selectionStart;
    textarea.setSelectionRange(cursor, cursor);
    textarea.focus();
    document.execCommand('insertText', false, tag);
  };

  const surround = (startTag, endTag) => () => {
    const textarea = document.getElementById('_chatText');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    const replaceText = `${startTag}${selectedText}${endTag}`;
    textarea.focus();
    document.execCommand('insertText', false, replaceText);
    if (selectedText.length == 0) {
      const cursor = textarea.selectionStart - endTag.length;
      textarea.setSelectionRange(cursor, cursor);
    }
  };

  const createIcon = (name, type, handler, desc) => {
    const html = `
<li class="_showDescription __chatworkInputTools_toolbarIcon" role="button" aria-label="${desc}" >
  <span class="__chatworkInputTools_toolbarIcon_${type}">${name}</span>
</li>
    `.trim();
    const el = createElement(html);
    el.addEventListener('click', handler);
    return el;
  };

  const createIconWrapper = icons => {
    const html = '<ul id="__chatworkInputTools_toolbarIcons"></ul>';
    const el = createElement(html);
    const f = document.createDocumentFragment();
    for (const icon of icons) {
      f.appendChild(icon);
    }
    el.appendChild(f);
    return el;
  };

  const detectLanguage = () => {
    if (document.documentElement.lang != null) {
      switch (document.documentElement.lang) {
        case 'ja': return 'ja';
        default: return 'en';
      }
    }
    switch (true) {
      case document.body.classList.contains('ja'): return 'ja';
      default: return 'en';
    }
  };

  const lang = detectLanguage();

  // やっつけ

  let icons;
  if (lang == 'ja') {
    icons = createIconWrapper([
      createIcon('info', 'tag', surround('[info]', '[/info]'), 'info：選択したメッセージをinfoタグで囲みます'),
      createIcon('title', 'tag', surround('[title]', '[/title]'), 'title：選択したメッセージをtitleタグで囲みます'),
      createIcon('code', 'tag', surround('[code]', '[/code]'), 'code：選択したメッセージをcodeタグで囲みます'),
      createIcon('hr', 'tag', insert('[hr]'), 'hr：メッセージにhrタグを挿入します'),
      createIcon('bow', 'emo', insert('(bow)'), 'bow：メッセージにおじぎエモーティコンを挿入します'),
      createIcon('roger', 'emo', insert('(roger)'), 'roger：メッセージに了解！エモーティコンを挿入します'),
      createIcon('cracker', 'emo', insert('(cracker)'), 'cracker：メッセージにクラッカーエモーティコンを挿入します'),
    ]);
  } else {
    icons = createIconWrapper([
      createIcon('info', 'tag', surround('[info]', '[/info]'), 'info: Surround selection with [info] tag'),
      createIcon('title', 'tag', surround('[title]', '[/title]'), 'title: Surround selection with [title] tag'),
      createIcon('code', 'tag', surround('[code]', '[/code]'), 'code: Surround selection with [code] tag'),
      createIcon('hr', 'tag', insert('[hr]'), 'hr: Insert [hr] tag'),
      createIcon('bow', 'emo', insert('(bow)'), 'bow: Insert (bow) emo'),
      createIcon('roger', 'emo', insert('(roger)'), 'roger: Insert (roger) emo'),
      createIcon('cracker', 'emo', insert('(cracker)'), 'cracker: Insert (cracker) emo'),
    ]);
  }

  const inject = () => {
    if (document.getElementById('__chatworkInputTools_toolbarIcons') == null) {
      const parent = document.getElementById('_chatSendToolbar');
      const ref = document.getElementById('_chatSendTool');
      if (parent != null && ref != null) {
        parent.insertBefore(icons, ref.nextSibling);
      }
    }
  };
  inject();

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        inject();
      }
    }
  });

  const config = {
    childList: true,
  };

  observer.observe(document.getElementById('_chatSendArea'), config);
};

// Toリストの高さを2倍にする
const enlargeMentionList = () => {
  const el = document.querySelector('#_toList ._cwLTList');
  const height = parseInt(el.style.getPropertyValue('height'));
  el.style.setProperty('min-height', `${height}px`);
  el.style.setProperty('max-height', `${height * 2}px`);
  el.style.setProperty('height', '');
};

// タイムラインの出現を待つ
const ready = () => {
  const timeout = 10000;
  const delay = 100;
  const limit = timeout / delay;
  let count = 0;

  const find = (resolve, reject) => {
    if (count >= limit) {
      return reject(new Error('Timeline not found.'));
    }

    if (document.getElementById('_timeLine')) {
      return resolve();
    }

    count += 1;
    setTimeout(() => find(resolve, reject), delay);
  };

  return new Promise((resolve, reject) => find(resolve, reject));
};

ready().then(() => {
  addToolbarIcons();
  enlargeMentionList();
}).catch((err) => console.log(err));
