document.getElementById('_chatText').addEventListener('keydown', function(e){
  if (e.keyCode != 13 || e.shiftKey || e.ctrlkey || e.metaKey || e.altKey) {
    return;
  }

  let chatTextarea = e.target
    , text = chatTextarea.value
    , selectionStart = chatTextarea.selectionStart
    , selectionEnd = chatTextarea.selectionEnd
    , matchIndent = text.substr(0, selectionStart).replace(/\r\n|\r/g, '\n').split('\n').pop().match(/^[\x20\t]+/);

  if (matchIndent == null) {
    return;
  }

  e.preventDefault();

  let indent = matchIndent.shift()
    , caret = selectionStart + indent.length + 1;

  chatTextarea.value = text.substr(0, selectionStart)
    + '\n'
    + indent
    + text.substr(selectionEnd, text.length);
  chatTextarea.setSelectionRange(caret, caret);
});

