describe('pageCtrl instance:', function() {

  var $controller;
  var $rootScope;
  var $scope;
  var $q;
  var mockPostService;

  beforeEach(function () {
    module('app');
    inject(function(_$controller_, _$rootScope_, _$q_, _PostService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        $scope = $rootScope.$new();
        mockPostService = jasmine.createSpyObj('PostService', ['getPosts']);
        mockPostService.getPosts.and.returnValue($q.when({
          data: [{id: 'blah',title: 'blah',content: 'blah'}]
        }));
        underTest = $controller('pageCtrl', {
            '$scope': $scope,
            'PostService': mockPostService
        });
        $scope.$apply();
      })
  });

  it('should have its `hello` property set. At this point we dont care what the \
    value is.', function() {
    expect(underTest.hello).toBeDefined();
  });

  it('should have the `posts` field set with bunch of values which would confirm \
    `PostService.getPosts` was called.', function () {
    expect(mockPostService.getPosts).toHaveBeenCalled();
    expect(underTest.posts).toEqual([{
      id: 'blah', title: 'blah', content: 'blah'
    }]);
    expect(underTest.posts.length).toBe(1);
    expect(mockPostService.getPosts.calls.count()).toBe(1);
  });

});
