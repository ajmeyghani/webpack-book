(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["myapp"] = factory(require("angular"));
	else
		root["myapp"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar angular = __webpack_require__(/*! angular */ 1);\nvar appModule = angular.module('app', []);\n\n__webpack_require__(/*! services */ 2)(appModule);\n__webpack_require__(/*! page/page-directive */ 6)(appModule);\n\nangular.element(document).ready(function () {\n  angular.bootstrap(document.getElementsByTagName('body')[0], ['app']);\n});\n\nexports.default = appModule;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/main.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/main.js?");

/***/ },
/* 1 */
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"angular\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22angular%22?");

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (ngModule) {\n  ngModule.factory('PostService', function ($http) {\n    return {\n      getPosts: function getPosts() {\n        return $http.get('/api/posts');\n      }\n    };\n  });\n};\n\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/services/index.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/services/index.js?");

/***/ },
/* 3 */,
/* 4 */
/*!********************************!*\
  !*** ./src/page/page-tpl.html ***!
  \********************************/
/***/ function(module, exports) {

	eval("module.exports = \"<p>{{pageCtrl.hello}}</p>\\n<ul>\\n  <li ng-repeat=\\\"post in pageCtrl.posts\\\">\\n    {{ post.title }}\\n  </li>\\n</ul>\\n\\n\\n\"\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/page/page-tpl.html\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/page/page-tpl.html?");

/***/ },
/* 5 */,
/* 6 */
/*!************************************!*\
  !*** ./src/page/page-directive.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (pageModule) {\n\n  pageModule.run(function ($templateCache) {\n    $templateCache.put('page-tpl', __webpack_require__(/*! ./page-tpl.html */ 4));\n  });\n\n  pageModule.directive('page', function () {\n    return {\n      restrict: 'E',\n      controller: 'pageCtrl',\n      controllerAs: 'pageCtrl',\n      templateUrl: 'page-tpl'\n    };\n  });\n\n  pageModule.controller('pageCtrl', function ($scope, PostService) {\n    /* More on $scope vs controllerAs:\n        https://toddmotto.com/digging-into-angulars-controller-as-syntax/\n    */\n    var self = this;\n    self.hello = 'hello there';\n    PostService.getPosts().then(function ok(resp) {\n      self.posts = resp.data;\n      $scope.$broadcast('posts:loaded', resp.data);\n    }, function err(errResp) {\n      console.log(errResp);\n    });\n\n    /* In case you need a watch */\n    $scope.$watch(angular.bind(self, function () {\n      return this.posts;\n    }), function (newVal, oldVal) {\n      // ...\n    });\n\n    /* In case you need to use events */\n    $scope.$on('posts:loaded', function (e, posts) {\n      console.log('posts loaded');\n      console.log(posts);\n    });\n  });\n};\n\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/page/page-directive.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/page/page-directive.js?");

/***/ }
/******/ ])
});
;