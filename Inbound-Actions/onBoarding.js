gs.include('Cart');
createRequest();
function createRequest() {
    var cart = new Cart();
    // add in cart, substitute your cat item sys_id
    var item = cart.addItem('876531004f23da006a17ef6d0210c78d'); // On-boarding
    // set requested for, substitute your requested for
    //Set Variables in your Cart Item
	var str = email.body_text;
	//str.split('/\n/');
	var empid_pos = str.indexOf("EmployeeID");
	var empid_v = str.substring(empid_pos + 11);
	
    //cart.setVariable(item, 'Requestor Email', 'New Employee');
    cart.setVariable(item, 'lut_EmployeeID', empid_v);
    cart.setVariable(item, 'lut_FullName', email.body.full_name);
    cart.setVariable(item, 'lut_Department', email.body.department);
    cart.setVariable(item, 'lut_JobTitle', email.body.job_title);
    //gs.addInfoMessage("Requestor finish");
    //EMPLOYEE INFORMATION
    cart.setVariable(item, 'lut_onboard_super', email.body.supervisor);
    cart.setVariable(item, 'lut_located', email.body.located); 
    cart.setVariable(item, 'lut_EmployeeType', email.body.employee_type); 
    cart.setVariable(item, 'lut_superemail', email.body.supervisor_email);
    cart.setVariable(item, 'lut_eff_date', email.body.effective_date); 
	
    var cartmsg = "Received from: " + email.origemail + "\n\n" + email.body_text;
    cart.setVariable(item, 'lut_ob_description', cartmsg);
	current.short_description = cartmsg;
    var rc = cart.placeOrder();
    //gs.addInfoMessage(rc.number);
	
}