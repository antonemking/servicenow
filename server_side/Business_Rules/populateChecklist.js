/*
New feature in helsinki allows for checklist creation in support tasks. This script auto populates checklist items in the task.
*/

(function executeRule(current, previous /*null when async*/) {
var taskArr = [];
	gs.log(">>> Request item is " + current.request_item.cat_item);

	if(current.request_item.cat_item == 'a9cd8323372c36800039daa543990e61' /*HR Personnel Location Chnage*/){
		taskArr.push("Provide Moving Boxes for relocation","Assign/Move to New Cube/Office", "Building Access Changes based on new user location", "Parking Badge Changes as needed", "FedEx access – verify access or process changes as necessary");
		
	} else {
		taskArr.push('Move Equipment to New Cube / Office/update ticket with new cubicle/office location','Provide Moving Boxes');
	}

var table = 'sc_task';
var listId = '';
var id = current.sys_id;
var list = new GlideRecord('checklist');
list.addQuery('document', id + '');
list.addQuery('table', table);
list.query();
	if(!list.next()){
		
		gs.log(">>>> Current task sysid " + typeof current.sys_id + '');
		list.document = current.sys_id + '';
		list.name = 'Property Ops Checklist';
		list.owner = current.opened_by;
		list.table = table;
		listId = list.insert();
		
			for(var i = 0; i < taskArr.length; i ++){
				var item = new GlideRecord('checklist_item');
					
					item.checklist = listId;
					item.complete = false;
					item.name = taskArr[i];
					item.insert();
			}
	}

})(current, previous);