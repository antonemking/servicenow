/*
table - problem
type - record
operation - write

name - problem >>> state

Once the problem ticket have been assigned only the assigned personnel,
members in the assigned personnels team, and/or members in the Problem Management group
can update the status of the problem.
*/


var userObj = gs.getUser(),
	answer = false;

if(userObj.isMemberOf('Problem Management') || userObj.isMemberOf(current.assignment_group) || groupList(current.group_list)){
	answer = true;
}

// Ability to loop through a group list and check if the user belongs to a group within the list array.
function groupList(grpList){
	var list = grpList.split(',');
	
	for (var i = 0; i < list.length; i++){
		if (userObj.isMemberOf(list[i])){
			return true;
		}
	}
}