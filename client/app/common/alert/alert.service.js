class AlertService {

  constructor($rootScope) {
    var self = this;
    self.$rootScope = $rootScope;
    self.counter = 0;
  }

  error(message) {
    self = this;

    var alert = {
      id: self.counter++,
      type : 'error',
      message: message
    };

    return new Promise(
        function(resolve, reject){
          self.$rootScope.$broadcast('alert', alert);
          reject('error');
        }
    );
  }

  success(message) {
    self = this;

    var alert = {
      id: self.counter++,
      type : 'success',
      message: message
    };

    return new Promise(
        function(resolve, reject){
          self.$rootScope.$broadcast('alert', alert);
          resolve('success');
        }
    );
  }

}
AlertService.$inject = ['$rootScope'];
export default AlertService;
