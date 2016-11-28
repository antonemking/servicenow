var eventUtils = Class.create();
eventUtils.prototype = {
    initialize: function() {
    },
	
	getRecords: function(){
		var query = 'sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)';
		var gr = new GlideRecord('x_scafe_major_app_event');
		gr.addEncodedQuery(query);
		gr.query();
		return gr;
	},
	
	getEventCount: function(records){
		return records.getRowCount();
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
	
	getTicketStatus: function(eRecords){
	    var gr = new GlideRecord('x_scafe_major_app_event');
		gr.query();
		while(gr.next()){
			var ev = new GlideRecord('incident');
			ev.addNotNullQuery('x_scafe_major_app_maem_reference');
			ev.addQuery('x_scafe_major_app_maem_reference', eRecords);
			ev.query();
				if(ev.next()){
					return ev.state.getDisplayValue();
						
				}
		}
			
	
	
	},
	
	
	populateResponse: function(events){
		var resp={};
			
		function ticketStatus(){
					var inc = new GlideRecord('incident');
					inc.addNotNullQuery('x_scafe_major_app_maem_reference');
					inc.addQuery('x_scafe_major_app_maem_reference', events.sys_id);
					inc.query();
						if(inc.next()){
							return {"short_desc":inc.getValue('short_description'),
								   "state": inc.state.getDisplayValue(),
								   "desc": inc.getValue('description'),
								   "number": inc.getValue('number')};
						}
				}
		while (events.next()) {
			var clazz = events.getTableName();
			var sys_id = events.getValue('sys_id');
			
			if (!(clazz in resp))
				resp[clazz] = [];
			resp[clazz].push({
				number: events.getValue('number'),
				short_desc: events.getValue('short_description'),
				sys_id: sys_id,
				link: gs.getProperty('glide.servlet.uri') + 'api/now/v2/table/' + clazz + '/' + sys_id,
				snowui: gs.getProperty('glide.servlet.uri') + clazz + '.do?sys_id=' + sys_id,
				message: events.getValue('message'),
				application: events.getDisplayValue('application'),
				system_status: events.getDisplayValue('system_status'),
				event: events.getValue('event'),
				alert_type: events.getValue('alert_type'),
				coutry: events.getValue('country'),
				market: events.getValue('market'),
				status: events.getDisplayValue('status'),
				count: events.getValue('count'),
				ticket_info: ticketStatus(),
				created: events.getValue('sys_created_on')
			});
			
		}
		return resp;
				
		
		
		
		
	},
	
	

    type: 'eventUtils'
};