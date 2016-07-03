const buttons = [{
  html: '<li role="button" class="_showDescription extended" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="tag">info</span></li>',
  tag: ['[info]', '[/info]'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="tag">title</span></li>',
  tag: ['[title]', '[/title]'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="tag">code</span></li>',
  tag: ['[code]', '[/code]'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="hr：メッセージにhrタグを挿入します"><span class="tag">hr</span></li>',
  tag: ['[hr]'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="emo">bow</span></li>',
  tag: ['(bow)'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="emo">roger</span></li>',
  tag: ['(roger)'],
}, {
  html: '<li role="button" class="_showDescription extended" aria-label="roger：メッセージにクラッカーエモーティコンを挿入します"><span class="emo">cracker</span></li>',
  tag: ['(cracker)'],
}];

let sendTool = document.getElementById('_chatSendTool'),
  fragment = document.createDocumentFragment();

buttons.forEach(function(button) {
  let elm = createElement(button.html);
  elm.addEventListener('click', handler.apply(this, button.tag));
  fragment.appendChild(elm);
});

sendTool.appendChild(fragment);

// create DOM element from html
function createElement(html) {
  let dummy = document.createElement('div');
  dummy.insertAdjacentHTML('beforeEnd', html);
  return dummy.children[0];
}

function handler(tagOpen, tagClose = '') {
  return function(e) {
    let textarea = document.getElementById('_chatText');
    textarea.focus();

    let text = textarea.value,
      selectedText = text.slice(textarea.selectionStart, textarea.selectionEnd),
      replaceText = tagOpen + selectedText + tagClose;

    document.execCommand('insertText', false, replaceText);

    if (selectedText.length == 0) {
      let caret = textarea.selectionStart - tagClose.length;
      textarea.setSelectionRange(caret, caret);
    }
  };
}
