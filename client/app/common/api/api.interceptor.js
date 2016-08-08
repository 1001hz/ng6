class GenericInterceptor {

  /* ngInject */
  constructor($q, AlertService) {
    this.$q = $q;
    this.AlertService = AlertService;
  }

  responseError = (rejection) => {

    if (rejection.status === 401) {
      // Return a new promise
      return this.AlertService.error('You are not authorised.');
    }

    if (rejection.status === 404) {
      // Return a new promise
      return this.AlertService.error('The resource was not found.');
    }

    /* If not a 404, do nothing with this error.
     * This is necessary to make a `responseError`
     * interceptor a no-op. */
    return this.$q.reject(rejection);
  }
}

GenericInterceptor.$inject = ['$q', 'AlertService'];
export default GenericInterceptor;
