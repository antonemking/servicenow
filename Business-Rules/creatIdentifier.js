//aking - use in conjunction with kpi script action

(function executeRule(current, previous /*null when async*/) {

	var indi = current.u_indicator.getDisplayValue();
	var ts = current.u_time_series.getDisplayValue();
	var br = current.u_breakdown.getDisplayValue();
	var ele = current.u_element;
	
	if (ts =='' && br == '' && ele == ''){
		current.u_identifier = indi;
	}
	else if (ts == '' && ele == ''){
		current.u_identifier = indi + " / " + br; 
	}
	else if (br == ''){
		current.u_identifier = indi + " / " + ts;
	} 
	
	else {
		current.u_identifier = indi + " / " + br + " / " + ele + " / " + ts;
		
	}

})(current, previous);