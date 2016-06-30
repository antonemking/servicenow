//this will connect to a script include named catalogServices under script inlcude folder and query set desktop support groups
//to assign tasks based on a users location

updateTask();
function updateTask(){
	
	task.short_description = 
	task.description = 
	
	var srv = new catalogServices();
	var location = current.request.requested_for.location;
	if (location == ""){
		location = getFieldId("cmn_location","name","Coral Gables, FL");
	}
	
	task.assignment_group = srv.getSupportGroup(location, "Desktop Support");
	
	if (task.assignment_group == ""){
		task.assignment_group = srv.getServiceDesk();
	}

	var request = new GlideRecord('sc_request');
	if (request.get(current.request)){
		if (current.variables.request_origination== 'true' && request.assignment_group != getServiceDesk()) {
			request.assignment_group = getServiceDesk();
		}else{
			request.assignment_group = task.assignment_group;
		}
		request.update();
	}
	
	function getFieldId(table,field,value) {
		var fieldId = new GlideRecord(table);
		fieldId.addQuery(field, value);
		fieldId.query();
		fieldId.next();
		return fieldId.sys_id;
	}
	
}
