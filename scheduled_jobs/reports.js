/*
trigger a scheduled report to only managers of a group
*/


var group = new GlideRecord("sys_user_group");
group.addEncodedQuery("typeLIKE9b5ff4a26ff67900b2ddf59eae3ee492^active=true^u_system_group=false");
group.query();
var email_list = '';
var count = 0;
while (group.next()){
                if (count > 0){
                                email_list += ',';
                }
                email_list +=group.manager.email;
    count++;         
}
if (email_list!=''){
                var job = new GlideRecord("sysauto_report");
                if (job.get("name","scheduled report job name goes here")){
                                job.address_list = email_list;
                                job.update();
                                SncTriggerSynchronizer.executeNow(job);
                }
}