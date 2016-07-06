import './to-list.css';

export default function() {
  let toList     = document.getElementById('_toList');
  let list       = toList.getElementsByClassName('_cwLTList')[0];
  let optionArea = toList.getElementsByClassName('_cwLTSelectOptionArea')[0];
  let listHeight = parseInt(list.style.getPropertyValue('height'));
  let textarea   = document.getElementById('_chatText');
  let button     = $('<span class="linkStatus extended">すべて選択 (アイコンのみ)</span>')[0];

  list.style.setProperty('min-height', listHeight + 'px');
  list.style.setProperty('max-height', listHeight * 2 + 'px');
  list.style.setProperty('height', '');

  button.addEventListener('click', e => {
    let mention = RM.getSortedMemberList()
      .filter(id => id != AC.myid)
      .map(id => '[To:' + id + ']')
      .join('');

    mention += mention.length > 0 ? '\n' : '';

    textarea.setSelectionRange(
      textarea.selectionStart,
      textarea.selectionStart
    );

    textarea.focus();
    document.execCommand('insertText', false, mention);

    $(toList).fadeOut('fast');
  });

  optionArea.appendChild(button);
}
