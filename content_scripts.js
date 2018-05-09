const wait = () => {
  setTimeout(() => {
    if (document.getElementById('_chatText')) {
      inject();
      return;
    }
    wait();
  }, 0);
}
wait();

const inject = () => {
  const el = document.createElement('script');
  el.setAttribute('type', 'text/javascript');
  el.setAttribute('src', chrome.extension.getURL('dist/main.js'));
  document.body.appendChild(el);
};
