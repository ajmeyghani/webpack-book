const angular = require('angular');
const appModule = angular.module('app', []);

require('services')(appModule);
require('page/page-directive')(appModule);

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementsByTagName('body')[0], ['app']);
});

export default appModule;
