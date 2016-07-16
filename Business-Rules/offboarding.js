function onBefore(current, previous) {

	//This function will be automatically called when this rule is processed.
	
	setRequestedForFromVariable();
	
	function setRequestedForFromVariable() {
		current.requested_for = current.variables.requested_for;
		current.u_unencrypted_termination_reason = current.variables.termination_reason;
		current.description = current.variables.first_name + ' ' + current.variables.last_name + ' - Termination is ' + current.variables.termination_type + '/' + current.variables.termination_process;
		
		var catRequest = new GlideRecord('sc_request');
		if (catRequest.get(current.request.sys_id)) {
			
			catRequest.requested_for = current.variables.requested_for;
			catRequest.update();
		}
	}
}