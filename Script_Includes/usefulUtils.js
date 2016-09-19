var usefulUtils = Class.create();
usefulUtils.prototype = {
    initialize: function() {
    },
	/* aking - get ID of any reference field*/
	
    getFieldId: function(table,field,value) {
	var fieldId = new GlideRecord(table);
	fieldId.addQuery(field, value);
	fieldId.query();
	fieldId.next();
	//gs.log(">>>> Comany ID Is: " + field.sys_id);
	return fieldId.sys_id;
},
	/* aking - Reject Items at the request level */
	processItemApprovals: function(request,approval_value){
		var item = new GlideRecord("sc_req_item");
		item.addQuery("request",current.sys_id);
		item.query();
		while (item.next()){
			var approval = new GlideRecord("sysapproval_approver");
			approval.addQuery("sysapproval",item.sys_id);
			approval.addQuery("state","rejected");
			gs.log(">>>> items being canceled " + item.sys_id);
			approval.query();
			while (approval.next()){
				approval.state = approval_value;
				approval.update();
			}
		}
	},
	
	getUserInfo: function(value){
		var gr = new GlideRecord('sys_user');
		gr.addQuery('sys_id', value);
		gr.query();
		gr.next();
		return gr.u_cost_center;
		
		
	},
	
    type: 'usefulUtils'
};