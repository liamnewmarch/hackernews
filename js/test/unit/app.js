describe('URLProvider', function() {

    beforeEach(module('app'));

    it('should return top url', inject(function(URLProvider) {

        var expected = 'https://hacker-news.firebaseio.com/v0/topstories',
            returned = URLProvider.top();

        expect(returned).toEqual(expected);

    }));

    it('should return item url', inject(function(URLProvider) {

        var expected = 'https://hacker-news.firebaseio.com/v0/item/123456',
            returned = URLProvider.item(123456);

        expect(returned).toEqual(expected);

    }));

    it('should return view url', inject(function(URLProvider) {

        var expected = 'https://news.ycombinator.com/item?id=123456',
            returned = URLProvider.view(123456);

        expect(returned).toEqual(expected);

    }));

    it('should return vote url', inject(function(URLProvider) {

        var expected = 'https://news.ycombinator.com/vote?for=123456&dir=up&whence=news',
            returned = URLProvider.vote(123456);

        expect(returned).toEqual(expected);

    }));

});

describe('TopStoriesCtrl', function() {

    beforeEach(module('app'));

    it('should create stories array', inject(function($controller) {

        var scope = {};

        $controller('TopStoriesCtrl', {
            $scope: scope
        });

        expect(scope.stories.length).toBe(0);

    }));

});
