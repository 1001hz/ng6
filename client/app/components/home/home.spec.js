import HomeModule from './home';

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile, MockAlbumService, MockLoaderService;

  beforeEach(window.module(HomeModule));

  //beforeEach(function(){
  //  window.module(function($provide) {
  //    $provide.value('AlbumService', MockAlbumService);
  //    $provide.value('LoaderService', MockLoaderService);
  //  });
  //});

  beforeEach(inject(($injector, $q) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    //
    //var deferred = $q.defer();
    //deferred.resolve('album');
    //MockAlbumService = {
    //  getAlbum: function () {
    //    return deferred.promise;
    //  }
    //};
    //
    //MockLoaderService = {
    //  start: function () {
    //    return;
    //  }
    //};
  }));



  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    //it('default component should be home', () => {
    //  $location.url('/');
    //  $rootScope.$digest();
    //  expect($state.current.component).to.eq('home');
    //});
  });

  describe('Controller', () => {
    // controller specs
    //let controller;
    //beforeEach(() => {
    //  controller = $componentController('home', {
    //    $scope: $rootScope.$new()
    //  });
    //});
    //
    //it('has a name property', () => { // erase if removing this.name from the controller
    //  expect(controller).to.have.property('name');
    //});
  });

  describe('View', () => {
    // view layer specs.
    //let scope, template;
    //
    //beforeEach(() => {
    //  scope = $rootScope.$new();
    //  template = $compile('<home></home>')(scope);
    //  scope.$apply();
    //});
    //
    //it('has name in template', () => {
    //  expect(template.find('h1').html()).to.eq('Found in home.html');
    //});

  });
});
