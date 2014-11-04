describe('URLProvider', function() {

    var urlProvider;

    beforeEach(function() {

        module('app');

        inject(function(URLProvider) {
            urlProvider = URLProvider;
        });
    });

    it('should return top url', function() {

        var expected = 'https://hacker-news.firebaseio.com/v0/topstories',
            returned = urlProvider.top();

        expect(returned).toEqual(expected);

    });

    it('should return item url', function() {

        var expected = 'https://hacker-news.firebaseio.com/v0/item/123456',
            returned = urlProvider.item(123456);

        expect(returned).toEqual(expected);

    });

    it('should return view url', function() {

        var expected = 'https://news.ycombinator.com/item?id=123456',
            returned = urlProvider.view(123456);

        expect(returned).toEqual(expected);

    });

    it('should return vote url', function() {

        var expected = 'https://news.ycombinator.com/vote?for=123456&dir=up&whence=news',
            returned = urlProvider.vote(123456);

        expect(returned).toEqual(expected);

    });

});

describe('TopStoriesCtrl', function() {

    var $scope = {};

    beforeEach(function() {
        module('app');

        inject(function($rootScope) {
            $scope = $rootScope.$new();
        });

        inject(function($controller) {
            $controller('TopStoriesCtrl', {
                $scope: $scope
            });
        });
    });

    it('should create stories array', function() {
        expect(Array.isArray($scope.stories)).toBe(true);
    });

    it('should display loading status', function() {
        expect($scope.status).toBe('Loading');
    });

    it('should fetch top stories', function(done) {

        function check() {
            $scope.$digest();
            if ($scope.stories.length > 0) {
                done();
            } else {
                setTimeout(check, 500);
            }
        }

        check();
    });
});
