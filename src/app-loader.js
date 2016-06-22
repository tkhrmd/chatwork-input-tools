let elm = document.createElement('script');
elm.setAttribute('type', 'text/javascript');
elm.setAttribute('src', chrome.extension.getURL('build/bundle.js'));
document.body.appendChild(elm);
