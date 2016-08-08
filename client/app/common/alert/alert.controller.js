class AlertController {
  constructor($scope) {
    var self = this;
    self.$scope = $scope;
    self.alerts = [];

    self.$scope.$on('alert', function(event, alert){
      self.alerts.push(alert);
    });
  }

  close(alertId) {
    console.log(alertId);
    var self = this;
    for(var i=0; i<self.alerts.length; i++) {
      if(self.alerts[i].id === alertId) {
        self.alerts.splice(i, 1);
      }
    }
  }
}
AlertController.$inject = ['$scope'];
export default AlertController;
