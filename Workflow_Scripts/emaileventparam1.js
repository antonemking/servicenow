sendMail();
function sendMail(){
	var value = '';
    var servTsk = new GlideRecord('sc_task');
	var id = current.sys_id;
	var group = 'assignment_group=' + getFieldId('sys_user_group', 'name', 'Windows');

	servTsk.addQuery('request_item', id);
	servTsk.addEncodedQuery(group);
	servTsk.addNotNullQuery('u_employee_email_address');
	servTsk.query();
	while(servTsk.next()){
		value = servTsk.u_employee_email_address;
		}
	return value;
}	
	function getFieldId(table,field,value) {
		var fieldId = new GlideRecord(table);
		fieldId.addQuery(field, value);
		fieldId.query();
		fieldId.next();
		return fieldId.sys_id;
	}