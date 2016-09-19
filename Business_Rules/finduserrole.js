var grp = new GlideRecord('sys_group_has_role');
grp.addQuery('group.name', 'Philadelphia Tickets Project') ;
grp.addQuery('role.name', '111 Call Center Supervisor');
grp.query();
while(grp.next()){
gs.print(">>>> found " + grp.group.getDisplayValue());
}


var gr = new GlideRecord("syslog");
gr.addEncodedQuery("sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)^level=0^messageLIKEFile not found");
gr.query();
while(gr.next()){
var index = gr.addEncodedQuery("sys_created_onONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)^level=0^messageLIKEFile not found").indexOF("File not found") == 0;
gs.print(index);
}