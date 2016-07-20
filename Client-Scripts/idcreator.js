function onSubmit() {
   //Type appropriate comment here, and begin script below
    var indi = g_form.getReference('u_indicator');
	var ts = g_form.getReference('u_time_series');
	var br = g_form.getReference('u_breakdown');
	
	
	var id = indi + " / " + ts + " / " + br;
	
	g_form.setValue('u_indicator', id);
}