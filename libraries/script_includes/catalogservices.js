//author Bayview
//functions for performing various tasks in the service catalog. Mainly workflow scripting

var catalogServices = Class.create();
catalogServices.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	airCardInventoryClient: function(){
		var location = this.getParameter("sysparm_location");
		var inventory = this.airCardInventory(location);
		return inventory;
	},
	airCardInventory: function(location){
		var inventory = 0;
		var itemCount = new GlideAggregate("u_loaner_air_cards");
		itemCount.addQuery("u_location",location);
		itemCount.addEncodedQuery("u_request_itemISEMPTY");
		itemCount.addAggregate("COUNT");
		itemCount.query();
		while (itemCount.next()){
			inventory =  itemCount.getAggregate("COUNT");
		}
		return inventory;
	},
	userHasAircard: function(){
		var userID = this.getParameter("sysparm_user");
		var aircard_count = 0;
		var rtnValue = "false";
		var aircard = new GlideAggregate("u_loaner_air_cards");
		aircard.addEncodedQuery("u_request_item.active=true^u_request_item.request.requested_for="+userID);
		aircard.addAggregate("COUNT");
		aircard.query();
		while (aircard.next()){
			aircard_count = aircard.getAggregate("COUNT");
		}
		if (aircard_count > 0){
			rtnValue = "true";
		}
		return rtnValue;
	},
	getAircardNumber: function (ritm){
		var aircardID = "";
		var aircard = new GlideAggregate("u_loaner_air_cards");
		aircard.addQuery("u_request_item",ritm);
		aircard.query();
		while (aircard.next()){
			aircardID = aircard.sys_id;
		}
		return aircardID;
	},
	releaseAircard: function(ritm){
		var aircard = new GlideAggregate("u_loaner_air_cards");
		aircard.addQuery("u_request_item",ritm);
		aircard.query();
		while (aircard.next()){
			aircard.u_request_item = '';
			aircard.update();
		}
	},
	
	loanerLaptopInventoryClient: function(){
		var location = this.getParameter("sysparm_location");
		var inventory = this.loanerLaptopInvetory(location);
		return inventory;
	},
	loanerLaptopInvetory: function(location){
		var inventory = 0;
		var itemCount = new GlideAggregate("u_loaner_laptops");
		itemCount.addQuery("u_location",location);
		itemCount.addEncodedQuery("u_request_itemISEMPTY");
		itemCount.addAggregate("COUNT");
		itemCount.query();
		while (itemCount.next()){
			inventory =  itemCount.getAggregate("COUNT");
		}
		return inventory;
	},
	userHasLoanerLaptop: function(){
		try{
			var userID = this.getParameter("sysparm_user");
			var laptop_count = 0;
			var rtnValue = "false";
			var laptop = new GlideRecord("u_loaner_laptops");
			laptop.addEncodedQuery("u_request_item.active=true^u_request_item.request.requested_for="+userID);
			laptop.query();
			while (laptop.next()){
				rtnValue = "true";
			}
			return rtnValue;
		}catch(ex){
			gs.log(ex.message);
		}
	},
	getLaptopNumber: function (ritm){
		var laptopID = "";
		var laptop = new GlideAggregate("u_loaner_laptops");
		laptop.addQuery("u_request_item",ritm);
		laptop.query();
		while (laptop.next()){
			laptopID = laptop.sys_id;
		}
		return laptopID;
	},
	releaseLaptop: function(ritm){
		var laptop = new GlideAggregate("u_loaner_laptops");
		laptop.addQuery("u_request_item",ritm);
		laptop.query();
		while (laptop.next()){
			laptop.u_request_item = '';
			laptop.update();
		}
	},
	loanerProjectorInventoryClient: function(){
		var location = this.getParameter("sysparm_location");
		var inventory = this.loanerProjectorInvetory(location);
		return inventory;
	},
	loanerProjectorInvetory: function(location){
		var inventory = 0;
		var itemCount = new GlideAggregate("u_loaner_projectors");
		itemCount.addQuery("u_location",location);
		itemCount.addEncodedQuery("u_request_itemISEMPTY");
		itemCount.addAggregate("COUNT");
		itemCount.query();
		while (itemCount.next()){
			inventory =  itemCount.getAggregate("COUNT");
		}
		return inventory;
	},
	userHasLoanerProjector: function(){
		try{
			var userID = this.getParameter("sysparm_user");
			var projector_count = 0;
			var rtnValue = "false";
			var projector = new GlideRecord("u_loaner_projectors");
			projector.addEncodedQuery("u_request_item.active=true^u_request_item.request.requested_for="+userID);
			projector.query();
			while (projector.next()){
				rtnValue = "true";
			}
			return rtnValue;
		}catch(ex){
			gs.log(ex.message);
		}
	},
	getProjectorNumber: function (ritm){
		var projectorID = "";
		var projector = new GlideAggregate("u_loaner_projectors");
		projector.addQuery("u_request_item",ritm);
		projector.query();
		while (projector.next()){
			projectorID = projector.sys_id;
		}
		return projectorID;
	},
	releaseProjector: function(ritm){
		var projector = new GlideAggregate("u_loaner_projectors");
		projector.addQuery("u_request_item",ritm);
		projector.query();
		while (projector.next()){
			projector.u_request_item = '';
			projector.update();
		}
	},
	getSupportGroup: function(location, type){
		var rec = new GlideRecord('u_location_support_groups');
		var grpSysid = '';
		rec.addQuery('u_location.sys_id',location);
		rec.query();
		while (rec.next()){
			if (rec.u_group.type.getDisplayValue() == type){
				grpSysid = rec.u_group.sys_id;
			}
		}
		return grpSysid;
	},
	getServiceDesk:function(){
		var sdId;
		var group = new GlideRecord("sys_user_group");
		group.addEncodedQuery("name=Service Desk");
		group.query();
		while (group.next()){
			sdId = group.sys_id;
		}
		return sdId;
	},
	getAssignmentGroup: function (location){
		var groupID = "";
		var cmnLocation = new GlideRecord("cmn_location");
		if (cmnLocation.get(location)){
			if (cmnLocation.name == "Coral Gables, FL"){
				groupID = this.getServiceDesk();
			}else{
				groupID = this.getSupportGroup(location,"Desktop Support");
			}
		}
		if (groupID == ""){
			groupID = this.getServiceDesk();
		}
		return groupID;
	},
	getLocationAircads: function(task_id){
		var aircard_id ="";
		var task = new GlideRecord("sc_task");
		if (task.get(task_id)){
			var location = task.request_item.u_physical_office;
			var aircard = new GlideRecord("u_loaner_air_cards");
			aircard.addQuery("u_location",location);
			aircard.addEncodedQuery("u_request_itemISEMPTY");
			aircard.query();
			while (aircard.next()){
				aircard_id += ","+aircard.sys_id;
			}
		}
		return 'sys_idIN'+aircard_id;
	},
	getLocationLaptops: function(task_id){
		var laptop_id ="";
		var task = new GlideRecord("sc_task");
		if (task.get(task_id)){
			var location = task.request_item.u_physical_office;
			var laptop = new GlideRecord("u_loaner_laptops");
			laptop.addQuery("u_location",location);
			laptop.addEncodedQuery("u_request_itemISEMPTY");
			laptop.query();
			while (laptop.next()){
				laptop_id += ","+laptop.sys_id;
			}
		}
		return 'sys_idIN'+laptop_id;
	},
	getLocationProjectors: function(task_id){
		var projector_id ="";
		var task = new GlideRecord("sc_task");
		if (task.get(task_id)){
			var location = task.request_item.u_physical_office;
			var projector = new GlideRecord("u_loaner_laptops");
			projector.addQuery("u_location",location);
			projector.addEncodedQuery("u_request_itemISEMPTY");
			projector.query();
			while (projector.next()){
				projector_id += ","+projector.sys_id;
			}
		}
		return 'sys_idIN'+laptop_id;
	},
	ritmVariableInfo: function(ritm_id){
		var misc = '<b>Additional Info: </b>' + "<br/>";
		var itemVars = new GlideRecord('sc_item_option_mtom');
		itemVars.addQuery("request_item",ritm_id);
		itemVars.addEncodedQuery("sc_item_option.item_option_newISNOTEMPTY^sc_item_option.valueISNOTEMPTY^sc_item_option.value!=false^sc_item_option.item_option_new.name!=requested_for^ORsc_item_option.item_option_new.name=NULL^sc_item_option.item_option_new.name!=delivery_time");
		itemVars.query();
		while (itemVars.next()){
			var variable_name = itemVars.sc_item_option.item_option_new.name;
			var label = itemVars.sc_item_option.item_option_new.sys_name;
			var var_value = itemVars.sc_item_option.value;
			if (variable_name == 'approver_user'){
				var userObject = new UserAjax();
				var_value = userObject.getUserName(var_value);
			}
			misc += '<font color="#A5001A"><b>'+label+ '</b>: ' + var_value + '</font><br/>';
			
		}
		return misc;
	},	
	getExecutiveApprovers: function(){
		var sys_id = '';
		var approvers = new GlideRecord("u_approver_list");
		approvers.addEncodedQuery("u_display_record=true^u_user.active=true");
		approvers.query();
		while(approvers.next()){
			sys_id += approvers.u_user.sys_id +",";
		}		
		return 'sys_idIN'+sys_id;
	},
	processItemApprovals: function(request,approval_value){
		var item = new GlideRecord("sc_req_item");
		item.addQuery("request",current.sys_id);
		item.query();
		while (item.next()){
			var approval = new GlideRecord("sysapproval_approver");
			approval.addQuery("sysapproval",item.sys_id);
			approval.addQuery("state","requested");
			approval.query();
			while (approval.next()){
				approval.state = approval_value;
				approval.update();
			}
		}
	},
	type: 'catalogServices'
});
