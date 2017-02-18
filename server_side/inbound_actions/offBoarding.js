//Author Antone King
/* example message that is being consumed

 
EmployeeID=1479658774
Full Name=Phillip Jones
Effective Date=09/1/2016
Department=France Office
Job Title=Lead Dev
Located=Delaware
Supervisor Email=jyeakel@example.com
Employee Type=Employee
Supervisor=jyeakel
Call Type=New Hire

*/

//condition email.subject.indexOf("BPM") == 0 || email.subject.indexOf("HRIS Employee") == 0 || email.subject.indexOf("Workday Employee") == 0
gs.include('Cart');

createRequest();
function createRequest() {
	var tools = new usefulUtils();
    var cart = new Cart();
    
    //Update message body
    var msg_b = email.body_text;
	var cartmsg = "Received from: " + email.origemail + "\n\n" + msg_b;
    
    //Set values
	var call_type = tools.bodyParser(msg_b, "Call Type", "=").split("\n")[0];
	var emp_id = tools.bodyParser(msg_b, "EmployeeID" , "=" ).split("\n")[0];
	//var ad_username = tools.bodyParser(msg_b, "AD Username", "=").split("\n")[0];
	var full_name = tools.bodyParser(msg_b, "Full Name" , "=" ).split("\n")[0];
	var dept = tools.bodyParser(msg_b, "Department" , "=" ).split("\n")[0];
	var job_title = tools.bodyParser(msg_b, "Job Title" , "=" ).split("\n")[0];
	var supervisor = tools.bodyParser(msg_b, "Supervisor" , "=" ).split("\n")[0];
	var loc = tools.bodyParser(msg_b, "Located" , "=" ).split("\n")[0];
	var emp_type = tools.bodyParser(msg_b, "Employee Type" , "=" ).split("\n")[0];
	var super_email = tools.bodyParser(msg_b, "Supervisor Email" , "=" ).replace(/<[^>]*>/gi, " ").split("\n")[0];
	var eff_date = tools.bodyParser(msg_b, "Effective Date" , "=" ).split("\n")[0];
	
	var wf;
	
	if(call_type.toLowerCase() == "new hire") wf = '876531004f23da006a17ef6d0210c78d'; //on-board
		else
			wf = 'a584d96c2bf0ee003d02f62219da159a'; //off-board 
		
			 
	
	var item = cart.addItem(wf);
	
	gs.log(">> Call Type Struc - " + call_type + " " + typeof call_type);
	gs.log(">> EmployeeID Struc - " + emp_id + " " + typeof emp_id);
	//gs.log(">> AD Username Struc - " + ad_username + " " + typeof ad_username);
	gs.log(">> Full Name Struc - " + full_name + " " + typeof full_name);
	gs.log(">> Department Struc - " + dept + " " + typeof dept);
	gs.log(">> Job title Struc - " + job_title + " " + typeof job_title);
	gs.log(">> Supervisor Struc - " + supervisor + " " + typeof supervisor);
	gs.log(">> Location Struc - " + loc + " " + typeof loc);
	gs.log(">> Employee Type Struc - " + emp_type + " " + typeof emp_type);
	gs.log(">> Supervisor Email Struc - " + super_email + " " + typeof super_email);
	gs.log(">> Effective Date Struc - " + eff_date + " " + typeof eff_date);
	

    
    //Set supervisor name
    var user = new GlideRecord('sys_user');
		user.addQuery('email', super_email);
		user.query();
    if(user.next()){
        cart.setVariable(item, 'lut_onboard_super', user.sys_id);
        gs.log(">>> Supervisor name from query " + user.sys_id);
    }
    
    
    cart.setVariable(item, 'lut_onboard_calltype', call_type);
	cart.setVariable(item, 'lut_EmployeeID', emp_id);
	cart.setVariable(item, 'lut_FullName', full_name);
	cart.setVariable(item, 'lut_Department', dept);
	cart.setVariable(item, 'lut_JobTitle', job_title);
	cart.setVariable(item, 'lut_located', loc);
	cart.setVariable(item, 'lut_EmployeeType', emp_type);
	cart.setVariable(item, 'lut_superemail', super_email);
	cart.setVariable(item, 'lut_eff_date', eff_date);
	cart.setVariable(item, 'lut_ob_description', cartmsg); // On boarding description
	cart.setVariable(item, 'lut_off_description', cartmsg);// Off boarding description
     
    
    
    cart.placeOrder();
    
    
}