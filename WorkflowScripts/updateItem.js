updateRecord();
function updateRecord(){
	var addDate = new GlideDateTime();
	addDate = calcDueDate();
	var reqItem = new GlideRecord('sc_req_item');
	if (reqItem.get(current.sys_id)){
		var shipping = '';
		reqItem.u_agency_name = current.variables.agency_name;
		reqItem.u_alias_first_name = current.variables.alias_first_name;
		reqItem.u_alias_last_name = current.variables.alias_last_name;
		reqItem.u_alias_middle_name = current.variables.alias_middle_name;
		reqItem.u_background_check = current.variables.background_check;
		reqItem.u_building_access = returnBool(current.variables.building_access);
		reqItem.u_cost_center = current.variables.cost_center;
		reqItem.u_create_email = returnBool(current.variables.create_email);
		reqItem.u_display_name = current.variables.display_name;
		reqItem.u_end_date = current.variables.end_date;
		reqItem.u_first_name = current.variables.first_name;
		reqItem.u_it_applications = returnBool(current.variables.it_applications);
		reqItem.u_it_equipment = returnBool(current.variables.it_equipment);
		reqItem.u_last_name = current.variables.last_name;
		reqItem.u_manager_name = current.variables.manager_name;
		reqItem.u_manager_role = returnBool(current.variables.manager_role);
		reqItem.u_middle_name = current.variables.middle_name;
		reqItem.description = 'Request from Service Catalog';
		reqItem.u_parking_access = returnBool(current.variables.parking_access);
		reqItem.u_onboarding=true;
		shipping = current.variables.ship_to_address + ', ';
		shipping +=current.variables.city + ', ';
		shipping +=current.variables.state+ ', ';
		shipping += current.variables.zip;
		reqItem.u_physical_office = current.variables.physical_office;
		reqItem.u_re_hire = returnBool(current.variables.re_hire);
		reqItem.u_shipping_address = shipping;
		reqItem.u_start_date = current.variables.start_date;
		reqItem.u_change_effective_date = current.variables.start_date;
		reqItem.u_system_name = current.variables.system_name;
		reqItem.u_terminated_amiss = returnBool(current.variables.terminated_amiss);
		if (current.variables.title_position =="Other"){
			reqItem.u_title_position = current.variables.other_title;
		}else{
			reqItem.u_title_position = current.variables.title_position;
		}
		reqItem.u_type_of_personnel = getId(current.variables.type_of_personnel);
		reqItem.request.requested_for = current.variables.manager_name;
		reqItem.assignment_group = getHR();		
		reqItem.due_date = addDate;
		reqItem.estimated_delivery = addDate;
		reqItem.update();		
	}
	var req = new GlideRecord('sc_request');
	if (req.get(current.request)){
		if (current.variables.employee_name != ''){
			req.requested_for = current.variables.employee_name;
		}else{
			req.requested_for = current.variables.manager_name;
		}
		req.assignment_group = getHR();
		req.description = 'Request from Service Catalog';
		req.short_description = 'New Hire request from Service Catalog';
		req.due_date = addDate;
		req.update();
	}
	function getId(value){
		var typeID = '';
		var objTbl = new GlideRecord('u_types_of_personnel');
		objTbl.addQuery('u_personnel_type',value);
		objTbl.query();
		while (objTbl.next()){
			typeID = objTbl.sys_id;
		}
		return typeID;
	}
	function returnBool(strValue){
		var rtnValue = false;
		if (strValue == 'Yes'){
			rtnValue = true;
		}
		return rtnValue;
	}
	function getHR(){
		var groupId = '';
		var groupTbl = new GlideRecord('sys_user_group');
		groupTbl.addQuery('name','Recruiting');
		groupTbl.query();
		while (groupTbl.next()){
			groupId = groupTbl.sys_id;
		}
		return groupId;
	}
	function calcDueDate(){
		var dc = new DurationCalculator();
		dc.setSchedule('79c34d7d6f0f2500b2ddf59eae3ee4b1');
		dc.setStartDateTime(gs.nowDateTime());
		dc.calcDuration(302400);//adding 7 days
		return dc.getEndDateTime();
	}
	
}