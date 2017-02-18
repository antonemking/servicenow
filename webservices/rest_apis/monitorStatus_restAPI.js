(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

   var records = [],
    id = new eventUtils(),
    gr = new GlideRecord('x_scafe_major_app_event');
    
        gr.addEncodedQuery('sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
        gr.query();
    while(gr.next()){
        records.push({
            sys_id: gr.getUniqueValue(),
            number: gr.getValue('number'),
            message: gr.getValue('message'),
            application: gr.getDisplayValue('application'),
            system_status: gr.getDisplayValue('system_status'),
            event: gr.getValue('event'),
            alert_type: gr.getValue('alert_type'),
            coutry: gr.getValue('country'),
            market: gr.getValue('market'),
            created: gr.getValue('sys_created_on'),
            status: gr.getDisplayValue('status'),
            count: gr.getValue('count'),
            ticket_status: id.getTicketStatus(gr.getUniqueValue())
            
        });
    }
    return {
        records: records,
        total: gr.getRowCount()
    };

})(request, response); 