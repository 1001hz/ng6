import angular from 'angular';
import uiRouter from 'angular-ui-router';
import alertComponent from './alert.component.js';
import AlertService from './alert.service.js';

let alertModule = angular.module('alert', [
  uiRouter
])

.service('AlertService', AlertService)
.component('alert', alertComponent)

.name;

export default alertModule;
