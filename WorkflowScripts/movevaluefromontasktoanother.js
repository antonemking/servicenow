
function updatePrinceName(){
	var value = '';
    var servTsk = new GlideRecord('sc_task');
	var id = current.sys_id;
	var group = 'assignment_group=' + getFieldId('sys_user_group', 'name', 'Service Desk');

	servTsk.addQuery('request_item', id);
	servTsk.addEncodedQuery(group);
	servTsk.addNotNullQuery('u_principal_name');
	servTsk.query();
	while(servTsk.next()){
		value = servTsk.u_principal_name;
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

