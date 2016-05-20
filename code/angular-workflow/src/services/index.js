export default ngModule => {
  ngModule.factory('PostService', function($http) {
    return {
      getPosts() {
        return $http.get('/api/posts')
      }
    };
  });
};
