class AlertService {

  constructor($rootScope, $q) {
    var self = this;
    self.$rootScope = $rootScope;
    self.$q = $q;
    self.counter = 0;
  }

  error(message) {
    self = this;

    var alert = {
      id: self.counter++,
      type : 'error',
      message: message
    };

    var defered = self.$q.defer();
    self.$rootScope.$broadcast('alert', alert);
    defered.reject();
    return defered.promise;
  }

  success(message) {
    self = this;

    var alert = {
      id: self.counter++,
      type : 'success',
      message: message
    };

    var defered = self.$q.defer();
    self.$rootScope.$broadcast('alert', alert);
    defered.resolve();
    return defered.promise;
  }

}
AlertService.$inject = ['$rootScope', '$q'];
export default AlertService;
