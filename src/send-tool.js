import './send-tool.css';

export default function() {
  const buttons = [{
    html: '<li role="button" class="_showDescription extended" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="icon tag">info</span></li>',
    tag: ['[info]', '[/info]'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="icon tag">title</span></li>',
    tag: ['[title]', '[/title]'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="icon tag">code</span></li>',
    tag: ['[code]', '[/code]'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="hr：メッセージにhrタグを挿入します"><span class="icon tag">hr</span></li>',
    tag: ['[hr]'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="icon emo">bow</span></li>',
    tag: ['(bow)'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="icon emo">roger</span></li>',
    tag: ['(roger)'],
  }, {
    html: '<li role="button" class="_showDescription extended" aria-label="roger：メッセージにクラッカーエモーティコンを挿入します"><span class="icon emo">cracker</span></li>',
    tag: ['(cracker)'],
  }];

  let sendTool = document.getElementById('_chatSendTool');
  let textarea = document.getElementById('_chatText');
  let fragment = document.createDocumentFragment();

  buttons.forEach(button => {
    let elm = $(button.html)[0];
    elm.addEventListener('click', handler.apply(this, button.tag));
    fragment.appendChild(elm);
  });

  sendTool.appendChild(fragment);

  function handler(tagOpen, tagClose = '') {
    return e => {
      if (tagClose.length == 0) {
        let caret = textarea.selectionStart;
        textarea.setSelectionRange(caret, caret);
      }

      let selectedText = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      let replaceText = tagOpen + selectedText + tagClose;

      textarea.focus();
      document.execCommand('insertText', false, replaceText);

      if (selectedText.length == 0) {
        let caret = textarea.selectionStart - tagClose.length;
        textarea.setSelectionRange(caret, caret);
      }
    };
  }
}
