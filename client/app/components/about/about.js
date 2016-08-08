import angular from 'angular';
import uiRouter from 'angular-ui-router';
import aboutComponent from './about.component';

let aboutModule = angular.module('about', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('about', {
      url: '/about',
      component: 'about'
    })
    .state('about.page1', {
      url: '/page1',
      template: '<div><h1>Page1</h1><star-rating star-count="3"></star-rating></div>'
    })
    .state('about.page2', {
      url: '/page2',
      template: '<h1>Page2</h1>'
    });
})

.component('about', aboutComponent)

.name;

export default aboutModule;
