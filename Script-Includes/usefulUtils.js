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
	gs.log(">>>> Comany ID Is: " + field.sys_id);
	return fieldId.sys_id;
},
	
    type: 'usefulUtils'
};