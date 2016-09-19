(function executeRule(current, previous /*null when async*/) {

	var kpi = new GlideRecord('u_kpi');
	kpi.initialize();
	
	current.indicator = kpi.u_indicator;
	current.breakdown = kpi.u_breakdown;
	current.time_series = u_time_series;
	
	kpi.insert();
	
})(current, previous);