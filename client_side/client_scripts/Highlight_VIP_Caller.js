function onChange(control, oldValue, newValue, isLoading) {
	var callerLabel = $('label.incident.caller_id');
	var callerField = $('sys_display.incident.caller_id');
	if (!callerLabel || !callerField)
		return;
	
	if (!newValue) {
		callerLabel.setStyle({backgroundImage: ""});
		callerField.setStyle({color: ""});
		return;
	}
	g_form.getReference('caller_id', vipCallerCallback);
}

function vipCallerCallback(caller) {
	var callerLabel = $('label.incident.caller_id').down('label');
	var callerField = $('sys_display.incident.caller_id');
	if (!callerLabel || !callerField)
		return;
	
	//check for VIP status
	if (caller.vip == 'true') {
		g_form.setValue('urgency', '1');
		g_form.setValue('impact', '2');
		g_form.setValue('u_vip','true');
		var bgPosition = "95% 55%";
		if (document.documentElement.getAttribute('data-doctype') == 'true')
			bgPosition = "5% 45%";
			
		callerLabel.setStyle({backgroundImage: "url(images/icons/vip.gif)", backgroundRepeat: "no-repeat", backgroundPosition: bgPosition, paddingLeft: '30px' });
		callerField.setStyle({color: "red"});
	} else {
		callerLabel.setStyle({backgroundImage: ""});
		callerField.setStyle({color: ""});
	}
}
