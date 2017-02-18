function onSubmit() {	
	
	var catalogServices = new GlideAjax("BVloanercatServices");
	catalogServices.addParam("sysparm_name","loanerInventoryClient");
	catalogServices.addParam("sysparm_location",g_form.getValue("physical_office"));
	catalogServices.getXMLWait();
	var inventory = catalogServices.getAnswer();	
	if (inventory == 0){
		alert("There are currently no Loaner Laptops available, there may be a delay in acquiring this by your Start Date.");	
	}	
	var catService = new GlideAjax("BVloanercatServices");
	catService.addParam("sysparm_name","userHasloaner");
	catService.addParam("sysparm_user",g_form.getValue('requested_for'));
	catService.getXMLWait();
	var hasLoaner = catService.getAnswer();
	if (hasLoaner == 'true'){
		alert("You have an active Loaner Laptop request that has not been closed.");
		return false;
	}
}
