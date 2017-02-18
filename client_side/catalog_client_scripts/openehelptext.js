//aking - open help text on page load. Out of the box the help text is collapsed

function onLoad() {
   //Type appropriate comment here, and begin script below
   var myVar = g_form.getControl('<variable_name>');
var myVarHelp = $('question_help_IO_' + myVar.id.split(':')[1] + '_toggle');
toggleVariableHelpText(myVarHelp);
	
	var myVar2 = g_form.getControl('<variable_name>');
var myVarHelp2 = $('question_help_IO_' + myVar2.id.split(':')[1] + '_toggle');
toggleVariableHelpText(myVarHelp2);
	
	var myVar3 = g_form.getControl('<variable_name>');
var myVarHelp3 = $('question_help_IO_' + myVar3.id.split(':')[1] + '_toggle');
toggleVariableHelpText(myVarHelp3);
}


//Helsinki workaround


var myVar = g_form.getControl('caller_id').id;
myVar = myVar.replace(':', '_');
var wrapper = $('question_help_' + myVar + '_toggle_value');
var image = $('question_help_' + myVar + '_toggle');
wrapper.show();
image.addClassName('icon-vcr-down');
image.removeClassName('icon-vcr-right');
_frameChanged();