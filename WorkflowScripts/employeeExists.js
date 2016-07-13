answer = isNewEmployeeInServiceNow();
function isNewEmployeeInServiceNow() {
	var blFound = "no";
	var employeeEmail = getEmployeeEmail();
	if (employeeEmail!=''){
		var newEmployee = new GlideRecord('sys_user');
		newEmployee.addQuery('email',employeeEmail);
		newEmployee.query();		
		while (newEmployee.next()) {
			var req = new GlideRecord('sc_request');
			if (req.get(current.request)){
				req.requested_for = newEmployee.sys_id;
				req.update();
			}
			blFound = "yes";
		}
	}
	return blFound;
	
}
function getEmployeeEmail(){
	var rtnVal = '';
	var scTask= new GlideRecord('sc_task');
	scTask.addQuery('request_item',current.sys_id);
	scTask.addEncodedQuery('assignment_group='+getFieldId('sys_user_group','name','Windows'));
	scTask.addEncodedQuery('u_employee_email_addressISNOTEMPTY');
	scTask.query();
	while (scTask.next()) {
		//workflow.scratchpad.u_employee_email_address= createNewAccountTask.u_employee_email_address;
		rtnVal= scTask.u_employee_email_address;
		
	}
	return rtnVal;
	
}
function getFieldId(table,field,value) {
	var fieldId = new GlideRecord(table);
	fieldId.addQuery(field, value);
	fieldId.query();
	fieldId.next();
	return fieldId.sys_id;
}