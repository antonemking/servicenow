function onLoad() {
   //Type appropriate comment here, and begin script below
   var list = new GlideRecord('u_financial');
   list.initialize();
   list.u_demand = g_form.getValue('number');
   list.u_cost_category = "Hardware Purchases";
   list.insert();
	
}