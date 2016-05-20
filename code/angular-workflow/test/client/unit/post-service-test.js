describe('PostService:', function () {

    var PostService, $httpBackend, $q, httpMock;

    beforeEach(module('app', function($provide) {
      // comment this part if you want to use the http backend mock instead.
      httpMock = jasmine.createSpyObj('$http', ['get']);
      $provide.value('$http', httpMock);
    }));

    beforeEach(inject(function (_$httpBackend_, _PostService_, _$q_) {
      $httpBackend = _$httpBackend_;
      PostService = _PostService_;
      $q = _$q_;
    }));

    // test with httpBackEndModule
    // it('Should have a method called getPosts to call /api/posts', function () {
    //     $httpBackend.expectGET('/api/posts').respond([{title: 'blah'}]);
    //     PostService.getPosts().then(function(resp) {
    //       expect(resp.data).toEqual([{title: 'blah'}]);
    //     });
    //     $httpBackend.flush();
    // });

    it('Should make a GET requst', function () {
      PostService.getPosts();
      expect(httpMock.get).toHaveBeenCalled();
    });

    it('Should make the GET request with correct API path', function () {
      PostService.getPosts();
      expect(httpMock.get).toHaveBeenCalledWith('/api/posts');
    });

});
