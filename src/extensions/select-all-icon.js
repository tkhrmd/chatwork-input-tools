import j from 'jquery';

const getAccountIds = () => {
  return window.RM.getSortedMemberList().filter(id => id != window.AC.myid);
};

const getMentionString = () => {
  const str = getAccountIds().map(id => `[To:${id}]`).join('');
  return str.length > 0 ? `${str}\n` : str;
};

const closeTooltip = () => j('#_toList').fadeOut('fast');

const clickHandler = () => {
  const textarea = document.getElementById('_chatText');
  const caret = textarea.selectionStart;
  textarea.setSelectionRange(caret, caret);
  textarea.focus();
  document.execCommand('insertText', false, getMentionString());
  closeTooltip();
};

const createElement = (html) => {
  const el = document.createElement('template');
  el.insertAdjacentHTML('beforeend', html);
  return el.firstElementChild;
};

const createIcon = (text, handler) => {
  const html = `<span class="toSelectorTooltip__checkAll _ext_tooltip_selectall">${text}</span>`;
  const el = createElement(html);
  el.addEventListener('click', handler);
  return el;
};

const rendar = (lang) => {
  let text = '';
  switch (lang) {
    case 'ja':
      text = 'すべて選択 (アイコンのみ)';
      break;
    default:
      text = 'Select All (Icons)';
  }
  const el = createIcon(text, clickHandler);
  const target = document.getElementById('_toListSelectAll').parentNode;
  target.appendChild(el);
};

rendar(window.LANGUAGE);
