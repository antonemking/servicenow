/* Cross reference the user table with another and pull information about a user based on that user */

crossRef();

function crossRef() {
//populate userid based on agent ID - antone king Feb 2016
	var prd = new GlideRecord('table');
	prd.query();
	while (prd.next() ) 
	{
		var user = new GlideRecord('sys_user');  
		  user.addQuery('u_agent_id', prd.u_agent_id);  
		  user.query();
		
	if(user.next())
	{
		prd.u_employee = user.user_name;
		prd.u_employee_id = user.u_employee_id;
		prd.u_status = user.u_status;
		prd.u_hire_date = user.u_hire_date;
		prd.u_recent_hire_date = user.u_recent_hire_date;
		prd.u_termination_date = user.u_term_date;
		prd.update();
		
	}
	
		 
		 
	}
	

}
