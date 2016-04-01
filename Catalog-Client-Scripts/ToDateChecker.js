function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	var start_date = g_form.getValue('from');
	if (start_date !=''){
		var greater = compareDates("isGreater");
		if (greater == 'false'){
			alert("To date must be greater than the From date");
			g_form.setValue("to","");
			return;
		}
	}
	
	function compareDates(parmName){
		var ajax = new GlideAjax("DateComparison");
		ajax.addParam("sysparm_name",parmName);
		if (parmName == 'isGreaterCurrent'){
			ajax.addParam("sysparm_formDate",newValue);
		}
		if (parmName == 'isGreater'){
			ajax.addParam("sysparm_start",start_date);
			ajax.addParam("sysparm_end",newValue);
		}
		ajax.getXMLWait();
		return ajax.getAnswer();
		
	}
	
}
