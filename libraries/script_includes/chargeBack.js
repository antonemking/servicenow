var ChargeBackUtils = Class.create();
ChargeBackUtils.prototype = {
	initialize: function() {
		
	},
	
	processData : function(child, apps) {
		//var totalProcessed = 0;
		var gr2 = new GlideRecord('u_database_charge_calculation');
		gr2.addQuery('u_server.child', child);
		gr2.query();
		if(gr2.next()){
			if(gr2.u_app_count != apps){
				gr2.u_app_count = apps;
				gr2.update();
			}
			else if(gr2.u_db_instance_count != this._getNumDB(child)){
				gr2.u_db_instance_count = this._getNumDB(child);
				gr2.update();
			} else{ return;} // skip insert if server already exists or does not need to be updated
			
		} else {
			
			if(apps > 0){
				try{
					gr2.initialize();
					gr2.u_server = this._serverNameLookUp(child);
					gr2.u_app_count = apps;
					gr2.u_db_instance_count = this._getNumDB(child);
					//totalProcessed +=1;
					gr2.insert();
				} catch(e){
					gs.info("Unable to insert server and perform calculation on chargeback " + server.name + e.lineNumber + ": " + e);
				}
			}
			
			else { return;} // skip insert if the number of apps is 0
			}
		//gs.info("Chargebacks inserted : " + totalProcessed + " servers on " + gs.nowDateTime());
	},
	
	_getNumDB : function(child){
		var db_array = this._dbInstanceLookUp();
		var instance_count = 0;
		var gr = new GlideRecord('cmdb_rel_ci');
		gr.addQuery('child', child);
		gr.query();
		while (gr.next()){
			var length = db_array.length;
			for(var i = 0; i < length; i++){
				if(db_array[i] == gr.parent.name){
					instance_count += 1;
					continue;
					
				}
			}
		}
		
		return instance_count;
		
	},
	
	_dbInstanceLookUp : function(){
		var db_instance_array = [];
		var gr = new GlideRecord('cmdb_ci_db_instance');
		gr.query();
		while (gr.next()){
			db_instance_array.push(gr.name.toString());
		}
		return db_instance_array;
		
	},
	_serverNameLookUp : function(child){
		var gr = new GlideRecord('cmdb_rel_ci');
		gr.addQuery('child', child);
		gr.query();
		if(gr.next()){
			return gr.sys_id;
		}
	},
	
	type: 'ChargeBackUtils'
};