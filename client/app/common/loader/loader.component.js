import template from './loader.html';
import controller from './loader.controller.js';
import './loader.scss';

let loaderComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default loaderComponent;
