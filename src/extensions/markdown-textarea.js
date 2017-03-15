const enterToSendEnabled = () => {
  return document.getElementById('_sendEnterAction').getAttribute('aria-checked') == 'true';
};

const keydownHandler = (e) => {
  if (e.key != 'Enter') {
    return;
  }
  const enterToSend = enterToSendEnabled();
  const modKey = e.altKey || e.ctrlkey || e.metaKey || e.shiftKey;
  if (enterToSend && modKey || !enterToSend && !modKey) {
    enterKeyHandler(e);
  }
};

const getStartPos = (textarea) => {
  return textarea.value.lastIndexOf('\n', textarea.selectionStart - 1) + 1;
};

const getEndPos = (textarea) => {
  const end = textarea.value.indexOf('\n', textarea.selectionStart);
  return end > -1 ? end : textarea.value.length;
};

const extractListItem = (line) => {
  const re = /^([ 　]*)([*+-] |\d+\. |・)(.*)/;
  const matches = line.match(re);
  if (matches == null) {
    return null;
  }
  const [, indent, marker, body] = matches;
  return {
    indent,
    marker,
    body
  };
};

const modifyMarker = (marker) => {
  if (/\d+\./.test(marker)) {
    return `${parseInt(marker) + 1}. `;
  }
  return marker;
};

const enterKeyHandler = (e) => {
  const textarea = e.target;
  const start = getStartPos(textarea);
  const end = getEndPos(textarea);
  if (textarea.selectionStart != end) {
    return;
  }

  const li = extractListItem(textarea.value.substring(start, end));
  if (li == null) {
    return;
  }

  e.preventDefault();
  textarea.focus();

  if (li.body.length == 0) {
    textarea.setSelectionRange(start, end);
    document.execCommand('delete', false, null);
    return;
  }

  let marker = modifyMarker(li.marker);
  document.execCommand('insertText', false, `\n${li.indent}${marker}`);
};

const render = () => {
  document.getElementById('_chatText').addEventListener('keydown', keydownHandler);
};

render();
