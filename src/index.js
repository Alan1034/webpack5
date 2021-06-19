import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  // Lodash对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());