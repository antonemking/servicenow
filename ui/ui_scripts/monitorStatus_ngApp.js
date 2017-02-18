angular.module('mcdApp', []);

angular.module('mcdApp').config(function($httpProvider){
	$httpProvider.defaults.headers.common["X-UserToken"] = window.g_ck;
});