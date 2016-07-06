export default function() {
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
      e.altKey ||
      e.ctrlkey ||
      e.metaKey ||
      e.shiftKey
    ) {
      return;
    }

    let textarea       = e.target;
    let text           = textarea.value;
    let selectionStart = textarea.selectionStart;
    let lineStart      = text.lastIndexOf('\n', selectionStart - 1) + 1;
    let lineEnd        = text.indexOf('\n', selectionStart);

    // If the caret is in the last line.
    lineEnd = lineEnd == -1 ? text.length : lineEnd;

    if (selectionStart == lineStart) {
      return;
    }

    let line = text.substring(lineStart, lineEnd);

    // Markdown list item marker
    let matches = line.match(/^([\x20\t]*)([*+-]|\d+\.)(\x20)[\x20\t]*(\S?)/);

    // Japanese list item marker
    if (matches == null) {
      matches = line.match(/^([\x20\t\u3000]*)([\u30fb\u2460-\u2473\u3251-\u325f\u32b1-\u32bf])()[\x20\t\u3000]*(\S?)/);
    }

    if (matches == null) {
      return;
    }

    // e.g. '    * hoge' matches ['    * h', '    ', '*', ' ', 'h']
    let [, indent, marker, spacer, item] = matches;

    e.preventDefault();

    if (!item) {
      textarea.setSelectionRange(lineStart, lineEnd);
      document.execCommand('insertText', false, '\n');
      return;
    }

    // Increment number of the marker.
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
}
