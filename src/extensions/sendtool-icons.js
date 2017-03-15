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

const createElement = (html) => {
  const el = document.createElement('template');
  el.insertAdjacentHTML('beforeend', html);
  return el.firstElementChild;
};

const createTagIcon = (name, handler, desc) => {
  const html = `<li class="_showDescription _ext_sendtool_icon" role="button" aria-label="${desc}"><span class="_ext_sendtool_icon_tag">${name}</span></li>`;
  const el = createElement(html);
  el.addEventListener('click', handler);
  return el;
};

const createEmoIcon = (name, handler, desc) => {
  const html = `<li class="_showDescription _ext_sendtool_icon" role="button" aria-label="${desc}"><span class="_ext_sendtool_icon_emo">${name}</span></li>`;
  const el = createElement(html);
  el.addEventListener('click', handler);
  return el;
};

const addIcons = (icons) => {
  const sendtool = document.getElementById('_chatSendTool');
  const fragment = document.createDocumentFragment();
  for (const icon of icons) {
    fragment.appendChild(icon);
  }
  sendtool.appendChild(fragment);
};

const render = (lang) => {
  const icons = [];
  switch (lang) {
    case 'ja':
      icons.push(...[
        createTagIcon('info', surround('[info]', '[/info]'), 'info：選択したメッセージをinfoタグで囲みます'),
        createTagIcon('title', surround('[title]', '[/title]'), 'title：選択したメッセージをtitleタグで囲みます'),
        createTagIcon('code', surround('[code]', '[/code]'), 'code：選択したメッセージをcodeタグで囲みます'),
        createTagIcon('hr', insert('[hr]'), 'hr：メッセージにhrタグを挿入します'),
        createEmoIcon('bow', insert('(bow)'), 'bow：メッセージにおじぎエモーティコンを挿入します'),
        createEmoIcon('roger', insert('(roger)'), 'roger：メッセージに了解！エモーティコンを挿入します'),
        createEmoIcon('cracker', insert('(cracker)'), 'cracker：メッセージにクラッカーエモーティコンを挿入します'),
      ]);
      break;
    default:
      icons.push(...[
        createTagIcon('info', surround('[info]', '[/info]'), 'info: Surround selection with [info] tag'),
        createTagIcon('title', surround('[title]', '[/title]'), 'title: Surround selection with [title] tag'),
        createTagIcon('code', surround('[code]', '[/code]'), 'code: Surround selection with [code] tag'),
        createTagIcon('hr', insert('[hr]'), 'hr: Insert [hr] tag'),
        createEmoIcon('bow', insert('(bow)'), 'bow: Insert (bow) emo'),
        createEmoIcon('roger', insert('(roger)'), 'roger: Insert (roger) emo'),
        createEmoIcon('cracker', insert('(cracker)'), 'cracker: Insert (cracker) emo'),
      ]);
  }
  addIcons(icons);
};

render(window.LANGUAGE);
