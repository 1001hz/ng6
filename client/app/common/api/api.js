import angular from 'angular';
import ApiService from './api.service.js';
import GenericInterceptor from './api.interceptor.js'

let apiModule = angular.module('api', [])

.service('ApiService', ApiService)
.service('GenericInterceptor', GenericInterceptor)

.config(($httpProvider) => {
    "ngInject";

  $httpProvider.interceptors.push('GenericInterceptor');
})

.name;

export default apiModule;
