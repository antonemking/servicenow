var BVLoanercatServices = Class.create();
BVLoanercatServices.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	loanerInventoryClient: function(table){
		var location = this.getParameter("sysparm_location");
		var inventory = this.loanerInventory(table,location);
		return inventory;
	},
	loanerInventory: function(table,location){
		var inventory = 0;
		var itemCount = new GlideAggregate(table);
		itemCount.addQuery("u_location",location);
		itemCount.addEncodedQuery("u_request_itemISEMPTY");
		itemCount.addAggregate("COUNT");
		itemCount.query();
		while (itemCount.next()){
			inventory =  itemCount.getAggregate("COUNT");
		}
		return inventory;
	},
	userHasloaner: function(table){
		var userID = this.getParameter("sysparm_user");
		var loaner_count = 0;
		var rtnValue = "false";
		var loaner = new GlideAggregate(table);
		loaner.addEncodedQuery("u_request_item.active=true^u_request_item.requested_for="+userID);
		loaner.addAggregate("COUNT");
		loaner.query();
		while (loaner.next()){
			loaner_count = loaner.getAggregate("COUNT");
		}
		if (loaner_count > 0){
			rtnValue = "true";
		}
		return rtnValue;
	},
	getloanerNumber: function (table,ritm){
		var loanerID = "";
		var loaner = new GlideAggregate(table);
		loaner.addQuery("u_request_item",ritm);
		loaner.query();
		while (loaner.next()){
			loanerID = loaner.sys_id;
		}
		return loanerID;
	},
	releaseloaner: function(table,ritm){
		var loaner = new GlideAggregate(table);
		loaner.addQuery("u_request_item",ritm);
		loaner.query();
		while (loaner.next()){
			loaner.u_request_item = '';
			loaner.update();
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
	getLocationloaner: function(table,task_id){
		var loaner_id ="";
		var task = new GlideRecord("sc_task");
		if (task.get(task_id)){
			var location = task.request_item.u_physical_office;
			var loaner = new GlideRecord(table);
			loaner.addQuery("u_location",location);
			loaner.addEncodedQuery("u_request_itemISEMPTY");
			loaner.query();
			while (loaner.next()){
				loaner_id += ","+loaner.sys_id;
			}
		}
		return 'sys_idIN'+loaner_id;
	},
	type: 'BVLoanercatServices'
});
