import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loaderComponent from './loader.component.js';
import LoaderService from './loader.service.js';

let loaderModule = angular.module('loader', [
  uiRouter
])

.service('LoaderService', LoaderService)
.component('loader', loaderComponent)

.name;

export default loaderModule;
