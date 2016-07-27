//condition email.subject.indexOf("BPM") == 0 || email.subject.indexOf("HRIS Employee") == 0 || email.subject.indexOf("Workday Employee") == 0
gs.include('Cart');
createRequest();
function createRequest() {
    var cart = new Cart();
    
    //Update message body
    var msg = email.body_html.replace(/=/g, ":");
    var msg_b = email.body_text.replace(/=/g, ":");
    
    //Set Call Type
    var call_type = msg.indexOf("Call Type");
    var call_uc = msg.substring(call_type + 10);
    var call_v = call_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var typeCall = typeof call_v;
    gs.log(">>>> " + call_v);
    
    var wf;
    
    if(call_v == "New Hire") wf = '876531004f23da006a17ef6d0210c78d'; // On-boarding 876531004f23da006a17ef6d0210c78d
    else wf = 'a584d96c2bf0ee003d02f62219da159a'; // Off-boarding a584d96c2bf0ee003d02f62219da159a
    
    var item = cart.addItem(wf); 
    
  
    //Set employee ID
    var empid_pos = msg.indexOf("EmployeeID");
    var empid_uc = msg.substring(empid_pos + 11);
    var empid_v = empid_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundEmpId = msg_b.indexOf("EmployeeID") > -1;
    
    gs.log(">>>> EmpID " + foundEmpId);
    
    if(foundEmpId){
        cart.setVariable(item, 'lut_EmployeeID', empid_v);
    } else cart.setVariable(item, 'lut_EmployeeID', "");
    
    //Set full name
    var fullName_pos = msg.indexOf("Full Name");
    var fullName_uc = msg.substring(fullName_pos + 10);
    var fullName_v = fullName_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundFullName = msg_b.indexOf("Full Name") > -1;
    gs.log(">>>> fullname " + foundFullName);
    
    if(foundFullName){
        cart.setVariable(item, 'lut_FullName', fullName_v);
    } else cart.setVariable(item, 'lut_FullName', "");
    
    //Set department
    var dept_pos = msg.indexOf("Department");
    var dept_v = msg.substring(dept_pos + 11);
    var id_v = dept_v.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var d = new GlideRecord('cmn_location');
    var foundDept = msg_b.indexOf("Department") > -1;
    gs.log(">>>> " + foundDept);
    d.addQuery('name', id_v);
    d.query();
    d.next();
    
    if(foundDept){
        cart.setVariable(item, 'lut_Department', d.sys_id);
    } else cart.setVariable(item, 'lut_Department', "");
    
    //Set job title
    var title_pos = msg.indexOf("Job Title");
    var title_uc = msg.substring(title_pos + 10);
    var title_v = title_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundTitle = msg_b.indexOf("Job Title") > -1;
    gs.log(">>>> " + foundTitle);
    
    if(foundTitle){
        cart.setVariable(item, 'lut_JobTitle', title_v);
    }else cart.setVariable(item, 'lut_JobTitle', "");
    
    //Set located
    var loc_pos = msg.indexOf("Located");
    var loc_uc = msg.substring(loc_pos + 8);
    var loc_v = loc_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundLoc = msg_b.indexOf("Located") > -1;
    gs.log(">>>> " + foundLoc);
    if(foundLoc){
        cart.setVariable(item, 'lut_located', loc_v); 
    }else cart.setVariable(item, 'lut_located', ""); 
    
    //Set employee type
    var emp_pos  = msg.indexOf("Employee Type");
    var emp_uc = msg.substring(emp_pos + 14);
    var emp_v = emp_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundType = msg_b.indexOf("Employee Type") > -1;
    gs.log(">>>> " + foundType);
    
    if(foundType){
        cart.setVariable(item, 'lut_EmployeeType', emp_v); 
    }else cart.setVariable(item, 'lut_EmployeeType', ""); 
    
    //Set supervisor email
    var sup_pos = msg.indexOf("Supervisor Email");
    var sup_uc = msg.substring(sup_pos + 17);
    var sup_v = sup_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundSup = msg_b.indexOf("Supervisor Email") > -1;
    gs.log(">>>> " + foundSup);
    
    if(foundSup){
        cart.setVariable(item, 'lut_superemail', sup_v);
    }else cart.setVariable(item, 'lut_superemail', "");
    
    //Set effective date
    var date_pos = msg.indexOf("Effective Date");
    var date_uc = msg.substring(date_pos + 15);
    var date_dmy = date_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var date_s = date_dmy.split("/");
    var date_v = date_s[2] + "-" + date_s[0] + "-" + date_s[1];
    var foundDate = msg_b.indexOf("Effective Date") > -1;
    gs.log(">>>> " + foundDate);
    
    if(foundDate){
        cart.setVariable(item, 'lut_eff_date', date_v);
    }else cart.setVariable(item, 'lut_eff_date', "");
    
    //Set username
    var userName_pos = msg.indexOf("AD Username");
    var userName_uc = msg.substring(userName_pos + 12);
    var userName_v = userName_uc.replace(/<[^>]*>/gi, " ").split("  ")[0];
    var foundUserName = msg_b.indexOf("AD Username") > -1;
    gs.log(">>>> AD Username" + foundUserName);
    
    if(foundUserName){
        cart.setVariable(item, 'lut_off_username', userName_v);
    }else cart.setVariable(item, 'lut_off_username', "");
    
    //Set supervisor name
    var user = new GlideRecord('sys_user');
    user.addQuery('email', sup_v);
    user.query();
    while(user.next()){
        cart.setVariable(item, 'lut_onboard_super', user.sys_id);
    }
    
    
    //cart.setVariable(item, 'lut_EmployeeID', empid_v);
    //cart.setVariable(item, 'lut_FullName', fullName_v);
    //cart.setVariable(item, 'lut_Department', d.sys_id);
    //cart.setVariable(item, 'lut_JobTitle', title_v);
    //cart.setVariable(item, 'lut_located', loc_v); 
    //cart.setVariable(item, 'lut_EmployeeType', emp_v); 
    //cart.setVariable(item, 'lut_superemail', sup_v);
    //cart.setVariable(item, 'lut_eff_date', date_v);
    cart.setVariable(item, 'lut_onboard_calltype', call_v);
    //cart.setVariable(item, 'lut_off_username', userName_v);
    
    var cartmsg = "Received from: " + email.origemail + "\n\n" + msg_b;
    cart.setVariable(item, 'lut_ob_description', cartmsg); // On boarding description
    cart.setVariable(item, 'lut_off_description', cartmsg);// Off boarding description
    
    var rc = cart.placeOrder();
    //gs.addInfoMessage(rc.number);
    
}