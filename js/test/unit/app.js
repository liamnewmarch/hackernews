describe('General', function() {

    beforeEach(module('app'));

    it('should create stories', inject(function($controller) {

        var scope = {};

        $controller('TopStoriesCtrl', {
            $scope: scope
        });

        expect(scope.stories.length).toBe(0);

    }));

});
