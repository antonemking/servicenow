angular.module('mcdApp').controller('SystemStatCtrl', 
['$scope', 'SystemStatModel', 'TemplateService', function($scope, SystemStatModel, TemplateService){
	
	"use strict";
	
	$scope.model = SystemStatModel.initialize();
	
		
	$scope.getTemplate = function(name) {
		return TemplateService.getTemplate(name);
	};
	
	$scope.openStatus = function(sysId) {
		var modal = new GlideModalForm('MAS', 'u_major_application_status');
		modal.addParm('sysparm_view', 'MAS');
		modal.setSysID(sysId);
		modal.render();
	};

	
	 var colorMap = {
	 style1: "bar",
	 style2: "bar mid",
	 style3: "bar down"
	   
   };
	
	$scope.ChangeClass = function(score){
		if(score == 2){
			return colorMap.style1;
		}
		else return colorMap.style3;
	};											   
																		   
}]);