function onSubmit() {
   //Type appropriate comment here, and begin script below
   var req = g_form.getValue('variables.lu_scvs_user');
	
   var gr = new GlideRecord('sys_user');
	gr.addQuery('sys_id', req );
	gr.query();
	
	while(gr.next()) {
		
			gr.manager = g_form.getValue('variables.lut_scvs_supervisor');
			gr.location = g_form.getValue('variables.lut_scvs_location');
		    gr.u_director = g_form.getValue('variables.lut_scvs_director');
			gr.u_date_required = g_form.getValue('variables.lut_scvs_date_req');
			gr.u_reason_for_purchase = g_form.getValue('variables.lut_scvs_reason_purchase');
			gr.u_location_used = g_form.getValue('variables.lut_scvs_where_used');
			gr.update();
			
		} 

}

function onChange(control, oldValue, newValue, isLoading) {
	
	if (newValue == '') {
		g_form.setValue('variables.lu_scvs_user', '');
		g_form.setValue('variables.lut_scvs_location', '');
		g_form.setValue('variables.lut_scvs_supervisor', '');
		g_form.setValue('variables.lut_scvs_director', '');
		g_form.setValue('variables.lut_scvs_date_req', '');
		g_form.setValue('variables.lut_scvs_reason_purchase', '');
		g_form.setValue('variables.lut_scvs_where_used', '');
		return;
	}
	
	
	
	
	
    var req = g_form.getReference('variables.lu_scvs_user', setLocation);
	var mgr = g_form.getReference('variables.lu_scvs_user', setManager);
	var dir = g_form.getReference('variables.lu_scvs_user', setDirector);
	var dt = g_form.getReference('variables.lu_scvs_user', setDate);
	var reas = g_form.getReference('variables.lu_scvs_user', setReason);
	var where = g_form.getReference('variables.lu_scvs_user', setWhere);
	
	
	
	function setLocation(req) {
		if (req)
			g_form.setValue('variables.lut_scvs_location', req.location);
	}
    function setManager(mgr) {
		if (mgr)
			g_form.setValue('variables.lut_scvs_supervisor', mgr.manager);
	}
	function setDirector(dir){
		if(dir)
			g_form.setValue('variables.lut_scvs_director', dir.u_director);
	}
	function setDate(dt){
		if(dt)
			g_form.setValue('variables.lut_scvs_date_req', dt.u_date_required);
	}
	function setReason(reas){
		if(reas)
			g_form.setValue('variables.lut_scvs_reason_purchase', reas.u_reason_for_purchase);
	}
	function setWhere(where){
		if(where)
			g_form.setValue('variables.lut_scvs_where_used', where.u_location_used);
	}
}
