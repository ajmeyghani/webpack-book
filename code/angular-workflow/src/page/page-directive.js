export default pageModule => {

  pageModule.run(function ($templateCache) {
    $templateCache.put('page-tpl', require('./page-tpl.html'));
  });

  pageModule.directive('page', function() {
    return {
      restrict: 'E',
      controller: 'pageCtrl',
      controllerAs: 'pageCtrl',
      templateUrl: 'page-tpl'
    };
  });

  pageModule.controller('pageCtrl', function($scope, PostService) {
    const pageCtrl = this;
    pageCtrl.hello = 'hello there';

    PostService.getPosts()
      .then(function ok(resp) {
        pageCtrl.posts = resp.data;
        $scope.$broadcast('posts:loaded', resp.data);
      },
      function err(errResp) {
        console.log(errResp);
      });

    $scope.$watch('pageCtrl.posts', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal);
      }
    });

    $scope.$on('posts:loaded', function (e, posts) {
      // all the posts are loaded ...
    });

  });

};
