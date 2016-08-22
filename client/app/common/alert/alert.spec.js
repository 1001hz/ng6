import AlertModule from './alert'
import AlertService from './alert.service.js'

describe('Alert', () => {
    let $rootScope, $state, $location, $componentController, $compile, service;

    beforeEach(window.module(AlertModule));

    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $componentController = $injector.get('$componentController');
        $state = $injector.get('$state');
        $location = $injector.get('$location');
        $compile = $injector.get('$compile');
    }));

    describe('Module', () => {

    });

    describe('Service', () => {
        beforeEach(function(){
            // passing in $rootScope here because service has a dependency on it.
            service = new AlertService($rootScope);
        });

        it('should have counter set to 0 after initialization', function () {
            expect(service.counter).to.eq(0);
        });


        // testing a promise letting mocha take care of result
        it('tests async functionality in standard way', () => {
            // need to return success here for mocha to pass the test
            return service.success()
                .then(function(response) {
                    expect(response).to.eq('success');
                });
        });

        // testing a promise using chai-as-promised
        it('tests success function', () => {
            return expect(service.success()).to.eventually.equal('success');
        });

        it('tests error function', () => {
            return expect(service.error()).to.be.rejectedWith('error');
        });

    });

    describe('Controller', () => {
        // controller specs
        let controller;
        beforeEach(() => {
            controller = $componentController('alert', {
                $scope: $rootScope.$new()
            });
        });

        it('has an alerts property', () => {
            expect(controller).to.have.property('alerts');
        });
    });

    describe('View', () => {
        // view layer specs.
        let scope, template;

        beforeEach(() => {
            scope = $rootScope.$new();
            template = $compile('<alert></alert>')(scope);
            scope.$apply();
        });

        // it('has name in template', () => {
        //     expect(template.find('h1').html()).to.eq('about');
        // });

    });
});
