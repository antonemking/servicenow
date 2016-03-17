//condition = (current.state != 6 && current.state != 7) && (gs.hasRole("itil") || gs.hasRole("itil_admin") ) 

var sd = current.short_description;
var desc = current.description;
var cat  = current.category;
var scat = current.subcategory;
var wnotes = "";
getJournalEntries();


var start='incident.do?sys_id=-1&sysparm_query=';

//edit variables as per requirements
var var1='short_description=' + sd;
var var2='^category=' + cat;
var var3='^subcategory=' + scat;
var var4='^work_notes =' + wnotes;

//clone incident with the specific variables
var url = gs.getProperty('glide.servlet.uri') + start + var1 + var2 + var3 + var4;
gs.addInfoMessage('Clone of Incident # ' + current.number);
action.setRedirectURL(url);

//get the entries from journal table
function getJournalEntries() {
	var gr = new GlideRecord('sys_journal_field');
	var notesdisplay ="";
	gr.addQuery('element_id', current.sys_id);
	gr.addQuery('element',"work_notes");
	gr.query();
	while (gr.next()) {
		notesdisplay = notesdisplay + '\n' + gr.value + '\n' + '  ';
		//gs.addInfoMessage('I am in getJournalEntries ' + gr.element);
	}
	wnotes=notesdisplay;
	return;
}


######################################################################################
######################################################################################
(gs.hasRole("itil") || gs.hasRole("itil_admin") ) 
var  sd = current.short_description;
var desc = current.description;
var cat  = current.category;
var scat = current.subcategory;
var   ag = current.assignment_group;
var  sla = current.u_sla_type;
var  imp = current.impact;
var  urg = current.urgency;
var wnotes = "";
getJournalEntries();


var start='incident.do?sys_id=-1&sysparm_query=';

//edit variables as per requirements
var var1='short_description=' + sd;
var var2='^category=' + cat;
var var3='^subcategory=' + scat;
var var4='^assignment_group=' + ag;
var var5='^u_sla_type=' + sla;
var var6='^impact=' + imp;
var var7='^urgency=' + urg;
var var8='^work_notes=' + wnotes;

//clone incident with the specific variables

if (current.state != 6 && current.state != 7)
	var url = gs.getProperty('glide.servlet.uri') + start + var1 + var2 + var3 + var4 + var5 + var6 + var7;
else var url = gs.getProperty('glide.servlet.uri') + start + var1 + var2 + var3 + var4 + var5 + var6 + var7 + var8;
	
gs.addInfoMessage('Clone of Incident # ' + current.number);
action.setRedirectURL(url);

//get the entries from journal table
function getJournalEntries() {
	var gr = new GlideRecord('sys_journal_field');
	var notesdisplay ="";
	gr.addQuery('element_id', current.sys_id);
	gr.addQuery('element',"work_notes");
	gr.query();
	while (gr.next()) {
		notesdisplay = notesdisplay + '\n' + gr.value + '\n' + '  ';
		//gs.addInfoMessage('I am in getJournalEntries ' + gr.element);
	}
	wnotes=notesdisplay;
	return;
}


