gs.include('Cart');
createRequest();
function createRequest() {
    var cart = new Cart();
    
    var item = cart.addItem('876531004f23da006a17ef6d0210c78d'); // On-boarding 876531004f23da006a17ef6d0210c78d
  
    //Update message body
    var msg = email.body_html.replace(/=/g, ":");
    var msg_b = email.body_text.replace(/=/g, ":");
    
    //Set employee ID
    var empid_pos = msg.indexOf("EmployeeID");
    var empid_uc = msg.substring(empid_pos + 11);
    var empid_v = empid_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set full name
    var fullName_pos = msg.indexOf("Full Name");
    var fullName_uc = msg.substring(fullName_pos + 10);
    var fullName_v = fullName_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set department
    var dept_pos = msg.indexOf("Department");
    var dept_v = msg.substring(dept_pos + 11);
    var id_v = dept_v.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var d = new GlideRecord('cmn_location');
    d.addQuery('name', id_v);
    d.query();
    d.next();
    
    //Set job title
    var title_pos = msg.indexOf("Job Title");
    var title_uc = msg.substring(title_pos + 10);
    var title_v = title_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set located
    var loc_pos = msg.indexOf("Located");
    var loc_uc = msg.substring(loc_pos + 8);
    var loc_v = loc_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set employee type
    var emp_pos  = msg.indexOf("Employee Type");
    var emp_uc = msg.substring(emp_pos + 14);
    var emp_v = emp_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set supervisor email
    var sup_pos = msg.indexOf("Supervisor Email");
    var sup_uc = msg.substring(sup_pos + 17);
    var sup_v = sup_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    
    //Set effective date
    var date_pos = msg.indexOf("Effective Date");
    var date_uc = msg.substring(date_pos + 15);
    var date_dmy = date_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var date_s = date_dmy.split("/");
    var date_v = date_s[2] + "-" + date_s[0] + "-" + date_s[1];
    
    //Set supervisor name
    var user = new GlideRecord('sys_user');
    user.addQuery('email', sup_v);
    user.query();
    while(user.next()){
        cart.setVariable(item, 'lut_onboard_super', user.sys_id);
    }
    
    
    cart.setVariable(item, 'lut_EmployeeID', empid_v);
    cart.setVariable(item, 'lut_FullName', fullName_v);
    cart.setVariable(item, 'lut_Department', d.sys_id);
    cart.setVariable(item, 'lut_JobTitle', title_v);
    cart.setVariable(item, 'lut_located', loc_v); 
    cart.setVariable(item, 'lut_EmployeeType', emp_v); 
    cart.setVariable(item, 'lut_superemail', sup_v);
    cart.setVariable(item, 'lut_eff_date', date_v); 
    
    var cartmsg = "Received from: " + email.origemail + "\n\n" + msg_b;
    cart.setVariable(item, 'lut_ob_description', cartmsg);
    
    var rc = cart.placeOrder();
    //gs.addInfoMessage(rc.number);
    
}