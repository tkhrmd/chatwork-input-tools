const render = () => {
  const el = document.querySelector('#_toList ._cwLTList');
  const height = parseInt(el.style.getPropertyValue('height'));
  el.style.setProperty('min-height', `${height}px`);
  el.style.setProperty('max-height', `${height * 2}px`);
  el.style.setProperty('height', '');
};

render();
