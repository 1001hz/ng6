class LoaderController {
  constructor($scope) {
    var self = this;
    self.$scope = $scope;
    self.loading = false;

    self.$scope.$on('loader', function(event, isLoading){
      self.loading = isLoading;
    });
  }
}
LoaderController.$inject = ['$scope'];
export default LoaderController;
