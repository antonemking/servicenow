var eventUtils = Class.create();
eventUtils.prototype = {
    initialize: function() {
    },
	
	getFieldId: function(table,field,value){
		var fieldId = new GlideRecord(table);
		fieldId.addQuery(field, value);
		fieldId.query();
		fieldId.next();
		return fieldId.sys_id;
	},
	
	errorDetection: function(table, subject){
		var value = false;
		var e = new GlideRecord(table);
		var query = 'short_description='+subject;
		query += '^active=true';
		e.addEncodedQuery(query);
		e.query();
		if(e.next()){
			value = true;
			
		}
		return value;
		
	},
	
	getTicketStatus: function(sysid){
		var query = 'sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)';
	    var gr = new GlideRecord('x_scafe_major_app_event');
		gr.addEncodedQuery(query);
		gr.query();
		while(gr.next()){
			var ev = new GlideRecord('incident');
			ev.addNotNullQuery('x_scafe_major_app_maem_reference');
			ev.addQuery(gr.x_scafe_major_app_maem_reference, gr.sysid);
			ev.query();
				if(ev.next()){
					return ev.state.getDisplayValue();
		}
				}
			
	
	
	},
	
	
	populateResponse: function(){},
	
	

    type: 'eventUtils'
};