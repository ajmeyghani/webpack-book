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
    /* More on $scope vs controllerAs:
        https://toddmotto.com/digging-into-angulars-controller-as-syntax/
    */
    const self = this;
    self.hello = 'hello there';
    PostService.getPosts()
      .then(function ok(resp) {
        self.posts = resp.data;
        $scope.$broadcast('posts:loaded', resp.data);
      },
      function err(errResp) {
        console.log(errResp);
      });

    /* In case you need a watch */
    $scope.$watch(angular.bind(self, function () {
      return this.posts;
    }), function (newVal, oldVal) {
      // ...
    });

    /* In case you need to use events */
    $scope.$on('posts:loaded', function (e, posts) {
      console.log('posts loaded');
      console.log(posts);
    });

  });


};
