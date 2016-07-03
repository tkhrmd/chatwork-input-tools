let list = document.getElementById('_toList').getElementsByClassName('_cwLTList')[0],
  height = parseInt(list.style.getPropertyValue('height')) * 2 + 'px';
list.style.setProperty('max-height', height);
list.style.setProperty('height', height);
