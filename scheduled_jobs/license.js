/* Tag users with a subscription, bucket (e.g. admin , fulfiller) and sub-bucket (e.g. corp, service desk, bot etc..)
*  Yes I know this is an abosulte mess!
*/

checkRoles();

function checkRoles() {
	gs.info("Processing ...");
	try {
		var arrayUtil = new global.ArrayUtil();
		var totalUsers = 0;
		var grUser = new GlideRecord("sys_user");
		
		if (!grUser.isValidField('x_maim2_license_co_bucket')) {
			gs.info('The scheduled job "User Role Checker" cannot find the "type" field defined in the "sys_user" table');
			return ;
		}
		grUser.addEncodedQuery('active=true^x_maim2_license_co_override_background_job=false'); 
		//grUser.addQuery('sys_id', ''); //Used for testing purposes		
		grUser.query();
		while (grUser.next()) {
			
			totalUsers += 1;
			var theUser = grUser.sys_id;
			var theUserRoles = getRoles(theUser); // get an array of user roles
			var theCustomRoles = getCustomRoles(theUser); //temporary fix for array setup. Will clean up later AK.
			
			var roleCount= 0;
			if(theUserRoles){
				roleCount = theUserRoles.length; // count how many roles the user has if not 'undefined'
			}
			
			
			var pCode = grUser.u_cai_user_projectcode;
			var region = grUser.u_region;
			
			
			//If the user has no roles, then they are a 'requester'.
			if (roleCount === 0) {
				
				grUser.x_maim2_license_co_bucket = '';
				grUser.x_maim2_license_co_sub_bucket = '';
				grUser.x_maim2_license_co_subscriptions = '';
				grUser.update();			
				
			} else if (roleCount == 1 && arrayUtil.contains(theUserRoles, 'approver_user')) {
				grUser.x_maim2_license_co_bucket = 'approver';
				grUser.x_maim2_license_co_subscriptions = 'global';
				grUser.update();
				continue;
				
				
				// If the user has multiple roles and one of them is 'admin', then they are an 'administrator'.
			}  else if (roleCount > 0 && arrayUtil.contains(theUserRoles, 'admin') || arrayUtil.contains(theUserRoles, 'security_admin')) {
				grUser.x_maim2_license_co_subscriptions = 'global';
				grUser.x_maim2_license_co_bucket = 'administrator';
				if (grUser.sys_domain != '5dd48ebdd9fa21002d302841f239f1c9' /* CAI Home*/) {grUser.x_maim2_license_co_sub_bucket = 'sd';}
					if (region != ''){
						switch(region.toLowerCase()){
							case 'r3':
							grUser.x_maim2_license_co_sub_bucket = 'sd';
							break;
							case 'r1':
							case 'r2':
							case 'corp':
							case 'msc':
							grUser.x_maim2_license_co_sub_bucket = 'hq';
							
						}
					} if(grUser.x_maim2_license_co_bot){
						grUser.x_maim2_license_co_sub_bucket = 'bot';
					} if(grUser.x_maim2_license_co_snp){
						grUser.x_maim2_license_co_sub_bucket = 'snp';
					}
					if(arrayUtil.contains(theUserRoles, 'tracer')){
						grUser.x_maim2_license_co_sub_bucket = 'tracer';
					}
									
					grUser.update();
					continue;
					
					// If the user has more than one role and did not have the 'admin' role, then they are a 'fulfiller'.
				} else if (roleCount == 1 && arrayUtil.contains(theUserRoles, 'custom')) {
					grUser.x_maim2_license_co_bucket = 'run_time';
					grUser.update();
					continue;
					
					// If none of the previous conditions were met, then consider the user as 'other'.
				} else if (roleCount == 1 && arrayUtil.contains(theUserRoles, 'certification')){
					grUser.x_maim2_license_co_bucket = 'certification';
					grUser.update();
					continue;
					
				} else {
					if(roleCount > 0){
						// check if the user is only using custom apps
						var coreRoles = [];
						var ionSalesRoles = [];
						var ionProcessRoles = [];
						var tracerRoles = [];
						var ionActionRoles = [];
						
						for(var i = 0; i < theCustomRoles.length; i++){
							if(theCustomRoles[i].includes('x_mpaii_sales')){
								ionSalesRoles.push(theCustomRoles[i]);
							}
							else if(theCustomRoles[i].includes('x_mpaii_process')){
								ionProcessRoles.push(theCustomRoles[i]);
							}
							else if(theCustomRoles[i].includes('x_mpaii_aim') || theCustomRoles[i].includes('u_program_user')){
								ionActionRoles.push(theCustomRoles[i]);
							}
							else if(theCustomRoles[i].includes('x_mpaii_tracer')){
								tracerRoles.push(theCustomRoles[i]);
							}
							
							else if (theCustomRoles[i].includes('pa_viewer') || theCustomRoles[i].includes('u_asmdash_selfserv') || theCustomRoles[i].includes('CAI_Tracer') || theCustomRoles[i].includes('custom') || theCustomRoles[i].includes('sfa') || theCustomRoles[i].includes('tracer')) {
								continue;
							} else {
								coreRoles.push(theCustomRoles[i]);
							}
							
							
						}
						var core = parseInt(coreRoles.length);
						var sales = parseInt(ionSalesRoles.length);
						var process = parseInt(ionProcessRoles.length);
						var tracer = parseInt(tracerRoles.length);
						var action = parseInt(ionActionRoles.length);					
						
						var obj = {
							
							c: {value: core, sub : 'global'}, 
							s: {value: sales, sub : 'a23a6bd60f8e968045c63b8ce1050ed9'},
							p: {value: process, sub : '07cdaa9a0f39c74045c63b8ce1050e2a'},
							t: {value: tracer, sub : '1a1408b50198c200e8a1737744ce9899'},
							a: {value: action, sub : '0be9ef1a0f8e968045c63b8ce1050e9f'}
																	 		
						};
						var subscriptions= [];
						
						for (var key in obj) {
							if (obj.hasOwnProperty(key)){
								var value = obj[key].value;
								//gs.info(key + '----> ' + 'Sub ' + obj[key].sub + ' Value ' + obj[key].value);
								if(value > 0){
									 subscriptions.push(obj[key].sub);
								}
								
							}
						}				
						grUser.x_maim2_license_co_subscriptions = subscriptions.join(',');
						grUser.x_maim2_license_co_bucket = 'fulfiller';
						if (grUser.sys_domain != '5dd48ebdd9fa21002d302841f239f1c9' /* CAI Home*/) {grUser.x_maim2_license_co_sub_bucket = 'sd';}
							
							if(region != ''){
								switch(region.toLowerCase()){
									case 'r3':
									grUser.x_maim2_license_co_sub_bucket = 'sd';
									break;
									case 'r1':
									case 'r2':
									case 'corp':
									case 'msc':
									grUser.x_maim2_license_co_sub_bucket = 'hq';
									
								}
							}
							if(grUser.x_maim2_license_co_bot){
								grUser.x_maim2_license_co_sub_bucket = 'bot';
							}
							if(grUser.x_maim2_license_co_snp){
								grUser.x_maim2_license_co_sub_bucket = 'snp';
							}
							
							if(arrayUtil.contains(theUserRoles, 'sfa')){
								grUser.x_maim2_license_co_sub_bucket = 'sfa';
							}
							if(arrayUtil.contains(theUserRoles, 'tracer')){
								grUser.x_maim2_license_co_sub_bucket = 'tracer';
							}
								
							grUser.update();
						}
					}
				}
				var t = new GlideDateTime().getDisplayValue();
				gs.info("Processed " + totalUsers + " user records on " + t);
				
			} catch (e) {
				gs.info("Error in scheduled job 'User Role Checker' on line " + e.lineNumber + ": " + e);
			}
		}
		
		function getRoles(userId) {
			try {
				var selfServ = getSelfServ();
				var sfaArray = getSFARoles();
				var tracerArr = getTracerRoles();
				var theRoles = [];
				var arrayUtil = new global.ArrayUtil();
				
				var gr = new GlideRecord('sys_user_has_role');
				gr.addQuery('user', userId);
				gr.query();
				var theRoleName = '';
				var index = '';
				while (gr.next()) {
					if(gr.role != ''){
						theRoleName = gr.role.name;
						theRoles.push(theRoleName.toString());
						
						
					}
				}
				for(var i = 0; i < theRoles.length; i++){
					if(arrayUtil.contains(selfServ, theRoles[i])){
						theRoles[i] = 'custom';
					}
					if(arrayUtil.contains(sfaArray, theRoles[i])){
						theRoles[i] = 'sfa';
					}
					if(arrayUtil.contains(tracerArr, theRoles[i])){
						theRoles[i] = 'tracer';
					}
				}
				
				
				
				return arrayUtil.unique(theRoles);
			} catch (e) {
				gs.info("Error in scheduled job 'User Role Checker > getRoles()' on line " + e.lineNumber + ": " + e);
			}
		}
		
		function getCustomRoles(userId){
			var theRoles = [];			
			var gr = new GlideRecord('sys_user_has_role');
			gr.addQuery('user', userId);
			gr.query();
			while(gr.next()){
				theRoles.push(gr.role.name.toString());
			}
			return theRoles;
		}
		
		
		function getSelfServ(){
			var arr = [];
			var gr = new GlideRecord('x_maim2_license_co_run_time_role');
			gr.query();
			while(gr.next()){
				arr.push(gr.role.name.toString());
				
			}
			return arr;
			
		}
		function getSFARoles(){
			var arr = [];
			var gr = new GlideRecord('sys_user_role');
			gr.addEncodedQuery('nameSTARTSWITHx_mpaii_sfa');
			gr.query();
			while(gr.next()){
				arr.push(gr.name.toString());
			}
			
			return arr;
			
		}
		function getTracerRoles(){
			var arr = [];
			var gr = new GlideRecord('sys_user_role');
			gr.addEncodedQuery('nameSTARTSWITHx_mpaii_tracer');
			gr.query();
			while(gr.next()){
				arr.push(gr.name.toString());
			}
			
			return arr;
		}
		
