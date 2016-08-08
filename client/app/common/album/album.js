import angular from 'angular';
import AlbumService from './album.service.js';

let albumModule = angular.module('album', [])

.service('AlbumService', AlbumService)

.name;

export default albumModule;
