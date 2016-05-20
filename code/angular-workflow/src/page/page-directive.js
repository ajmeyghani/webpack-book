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

    /* In case you need to use events */
    $scope.$on('posts:loaded', function (e, posts) {
      console.log('posts loaded');
      // console.log(posts);
    });

  });

};
