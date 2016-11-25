(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var records = [];
    
    var gr = new GlideRecord('x_scafe_major_app_event');
        gr.addEncodedQuery('sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
        gr.query();
    while(gr.next()){
        records.push({
            sys_id: gr.getUniqueValue(),
            number: gr.getValue('number'),
            message: gr.getValue('message'),
            application: gr.getDisplayValue('application'),
            system_status: gr.getValue('system_status'),
            event: gr.getValue('event'),
            alert_type: gr.getValue('alert_type'),
            market: gr.getDisplayValue('market'),
            created: gr.getValue('created')
            
        });
    }
    return {
        records: records,
        total: gr.getRowCount()
    };

})(request, response); 