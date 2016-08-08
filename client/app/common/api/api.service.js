class ApiService {

  constructor($http) {
    var self = this;
    self.http = $http;
    self.host = "https://api.spotify.com";
  }

  get(endpoint) {
    var self = this;
    return self.http.get(self.host + endpoint);
  }

}
ApiService.$inject = ['$http'];
export default ApiService;
