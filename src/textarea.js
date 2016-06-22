document.getElementById('_chatText').addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    // case 9:
    //   tabKeyHandler(e);
    //   break;
    case 13:
      enterKeyHandler(e);
      break;
  }
});

// function tabKeyHandler(e) {}

function enterKeyHandler(e) {
  if (
    e.keyCode != 13 ||
    e.shiftKey ||
    e.ctrlkey ||
    e.metaKey ||
    e.altKey
  ) {
    return;
  }

  let textarea = e.target,
    text = textarea.value,
    selectionStart = textarea.selectionStart,
    lineStart = text.lastIndexOf('\n', selectionStart - 1) + 1,
    lineEnd = text.indexOf('\n', selectionStart);

  lineEnd = lineEnd == -1 ? text.length : lineEnd;

  if (selectionStart == lineStart) {
    return;
  }

  let line = text.slice(lineStart, lineEnd),
    matches = line.match(/^([\x20\t]*)([*+-]|\d+\.)(\x20)[\x20\t]*(\S?)/);

  if (matches == null) {
    matches = line.match(/^([\x20\t\u3000]*)([・\u2460-\u2473\u3251-\u325f\u32b1-\u32bf])()[\x20\t\u3000]*(\S?)/);
  }

  if (matches == null) {
    return;
  }

  // e.g. '    * hoge' matches ['    * h', '    ', '*', ' ', 'h']
  let indent = matches[1],
    marker = matches[2],
    spacer = matches[3],
    isEmpty = matches[4].length == 0;

  e.preventDefault();

  if (isEmpty) {
    textarea.setSelectionRange(lineStart, lineEnd);
    document.execCommand('insertText', false, '\n');
    return;
  }

  switch (true) {
    case /\d+\./.test(marker):
      marker = (parseInt(marker) + 1).toString(10) + '.';
      break;
    case /[\u2460-\u2473\u3251-\u325f\u32b1-\u32bf]/.test(marker):
      // chars [①-⑳㉑-㉟㊱-㊿]
      let charCode = marker.charCodeAt(0)
      charCode = charCode == 0x2473 ? 0x3251 :
        charCode == 0x325f ? 0x32b1 :
        charCode == 0x32bf ? 0x32bf :
        charCode += 1;
      marker = String.fromCharCode(charCode);
      break;
  }

  let placeholder = indent + marker + spacer;
  document.execCommand('insertText', false, '\n' + placeholder);
}
