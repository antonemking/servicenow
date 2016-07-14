/*
${mail_script:Company.banner} 

Request Item Number: ${number} is pending your approval. Please review this item and either Approve or Reject the user's request. 

${mail_script:approval_ritm_info} 

Click here to view your approval: ${URI_REF}
 
Thank you,

IT Department 

${mail_script:incident_script_2}
${mail_script:company_footer}

*/

var approval_id = '';
var item = new GlideRecord("sc_req_item");
if (item.get(current.sysapproval)){
	var catalogItem = '<font color="#A5001A"><b>Requested For: </b>'+ item.request.requested_for.name + '</font><br/>';
	catalogItem += '<font color="#A5001A"><b>Approval Due Date: </b>'+ current.due_date+ '</font><br/>';
	catalogItem+='<font color="#A5001A"><b>Requested Item: </b>'+ item.cat_item.getDisplayValue() + '</font><br/>';
	catalogItem += '<font color="#A5001A"><b>'+item.description + '</font></b><br/>';
	var cat_services = new catalogServices();
	var misc = cat_services.ritmVariableInfo(current.sysapproval);
	template.print(catalogItem + "<br/> " + misc);
}