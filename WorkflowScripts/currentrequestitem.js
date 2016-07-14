answer = pcHelp();
function pcHelp(){
	var tsk = new GlideRecord('sc_task');
	var id = current.sys_id;
	tsk.addQuery('request_item', id);
	tsk.addQuery('u_pc_support_needed', true);
	tsk.query();
	while(tsk.next()){
		return 'yes';

	}
 return 'no';
}