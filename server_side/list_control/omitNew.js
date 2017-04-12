/*

Only the manager of the assignment group or manager of an assignment group in the group list assigned to the problem task can create related problem tasks

*/


var mgr = current.problem.assignment_group.manager.user_name;
var groupList = current.problem.group_list.getDisplayValue();
var userName = gs.getUserName();
var answer;


if(userName == mgr || gs.hasRole('admin') || mgrFind()){
	answer = false;
} else {
	answer = true;
}

function mgrFind(){
	var list = groupList.split(',');
	for(var i = 0; i < list.length; i++){
		if(grpMatch(list[i].trim()) == userName){
			return true;
		}
	}
}

function grpMatch(group){
	var grp = new GlideRecord('sys_user_group');
	grp.addQuery('name', group);
	grp.query();
    grp.next();
		return grp.manager.user_name;
}