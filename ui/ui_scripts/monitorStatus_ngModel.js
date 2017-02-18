angular.module('mcdApp').service('SystemStatModel', function($http){
	"use strict";
	
		this.initialize = function() {
		this.endpoint = '/api/scafe/v1/mas';
		this.searchValue = '';
		this.data = {records: [], total: 0};
		this.getListData();
		return this;
	};
	
	this.getListData = function() {
		var _this = this;
		$http.get(_this.endpoint).then(function(response) {
			
			_this.data.records = response.data.result.records;
			_this.data.total = response.data.result.total;
				});
	};
	
	
});