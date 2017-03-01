/*
All checklist items must be complete before task can be closed

*/

(function executeRule(current, previous /*null when async*/) {

	
	
	function listIncomplete(){
	var id =  current.sys_id;
		var list = new GlideRecord('checklist');
			list.addQuery('document', id);
			list.query();
				if(list.next()){
					var item = new GlideRecord('checklist_item');
					item.addQuery('checklist.document', id);
					item.addQuery('complete', false);
					item.query();
						if(item.next()) {
							
							return true;
							


						}




				}
	}
	if(current.active.changesTo(false) && listIncomplete() == true){
			current.setAbortAction(true);
			gs.addErrorMessage("Please complete all checklist items before closting this task");
	}

})(current, previous);