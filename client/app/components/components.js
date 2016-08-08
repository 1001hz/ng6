import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import StarRating from './starRating/starRating';

let componentModule = angular.module('app.components', [
  Home,
  About,
  StarRating
])

.name;

export default componentModule;
