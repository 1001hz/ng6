class LoaderService {

  constructor($rootScope, $q) {
    var self = this;
    self.$rootScope = $rootScope;
  }

  start() {
    self = this;
    self.$rootScope.$broadcast('loader', true);
  }

  stop() {
    self = this;
    self.$rootScope.$broadcast('loader', false);
  }

}
LoaderService.$inject = ['$rootScope'];
export default LoaderService;
