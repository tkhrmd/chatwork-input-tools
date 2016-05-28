document.getElementById('_chatText').addEventListener('keydown', function(e){
  if (e.keyCode != 9) {
    return;
  }

  e.preventDefault();

  let chatTextarea = e.target
    , text = chatTextarea.value
    , selectionStart = chatTextarea.selectionStart
    , selectionEnd = chatTextarea.selectionEnd
    , caret = selectionStart + 1;

  chatTextarea.value = text.substr(0, selectionStart)
    + '\t'
    + text.substr(selectionEnd, text.length);
  chatTextarea.setSelectionRange(caret, caret);
});
