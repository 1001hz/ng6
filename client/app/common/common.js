import angular from 'angular';
import Navbar from './navbar/navbar';
import Alert from './alert/alert';
import Album from './album/album';
import Api from './api/api';
import Loader from './loader/loader';

let commonModule = angular.module('app.common', [
  Navbar,
  Alert,
  Album,
  Api,
  Loader
])

.name;

export default commonModule;
