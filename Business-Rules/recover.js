recoverAssets();
function recoverAssets() {

var number = 0 , results = [], user = current.name;
var asset = new GlideRecord('alm_asset');
    asset.addQuery('assigned_to.active', false);
	asset.query();
var count = asset.getRowCount();

	while(asset.next()) {
		results.push(number++);
		var usr = new GlideRecord('sys_user');
		usr.addEncodedQuery('active=false^sys_updated_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
		usr.addQuery('sys_id', asset.assigned_to);
		usr.query();
		
		if(usr.next() && number > 0) {
     
				var sc = new GlideRecord('sc_task');
					sc.initialize();
				    sc.request_item.request.requested_for = usr.name;
				    sc.cmdb_ci = asset.ci.getDisplayValue();
					sc.location = usr.location;
					sc.short_description = "Asset recovery triggered by LDAP for " + user;
					sc.description = asset.display_name + "\r" + "Location: " + usr.location.getDisplayValue();
					sc.insert();

		}

	} /*if(number > 0){

		var inc = new GlideRecord('incident');
			inc.initialize();
			inc.short_description = "Asset recovery for " + current.user_name + " has been triggered by ldap";
			inc.insert();
		*/
		
		/*
		 var w = new global.Workflow();  
		 var  wfId = w.getWorkflowFromName("Asset Recovery - Self Service");  
		 var context = w.startFlow(wfId,current,null); 
		 if (context != null)  {
      current.context = context.sys_id;
  }
}  */
	
	}
