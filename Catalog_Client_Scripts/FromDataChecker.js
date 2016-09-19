function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	
	var end_date = g_form.getValue('to');
	var greater = compareDates("isGreaterCurrent");
	if (greater == 'false'){
		alert("From date must be greater than current date");
		g_form.setValue("from","");
		return;
	}
	if (end_date !=''){
		greater = compareDates("isGreater");
		if (greater == 'false'){
			alert("To date must be greater than From date");
			g_form.setValue("to","");
			return;
		}
	}
	
	function compareDates(parmName){
		var ajax = new GlideAjax("DateComparison");
		ajax.addParam("sysparm_name",parmName);
		if (parmName == 'isGreaterCurrent'){
			ajax.addParam("sysparm_formDate",newValue.toString());
		}
		if (parmName == 'isGreater'){
			ajax.addParam("sysparm_start",newValue.toString());
			ajax.addParam("sysparm_end",end_date.toString());
		}
		ajax.getXMLWait();
		return ajax.getAnswer();
		
	}
	
}
