import sendTool from './send-tool.js';
import textarea from './textarea.js';
import toList from './to-list.js';

(function() {
  if (window.client_ver != '1.80a') {
    return;
  }

  sendTool();
  textarea();
  toList();
})();
