//aking - ui action on threshold table

createKpi();
function createKpi(){
	var gr = new GlideRecord('u_kpi');
	gr.intialize();
	gr.u_indicator = current.sys_id;
	gr.u_breakdown = current.breakdown.sys_id;
	gr.u_time_series = current.aggregate.sys_id;
	gr.u_threshold_referenced = current.sys_id;
	gr.u_element = current.element.getDisplayValue();
	gr.insert();
	action.setRedirectURL(current);
	
	
}