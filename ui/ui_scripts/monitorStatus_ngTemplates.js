angular.module('mcdApp').service('TemplateService', function() {

	"use strict";
	
	this.getTemplate = function(name) {
		return 'AJAXJellyRunner.do?template=' + name;
	};
});