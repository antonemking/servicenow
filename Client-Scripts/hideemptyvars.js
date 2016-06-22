//Name: Hide Empty Variables
//Type: OnLoad
//Table: Task
/Inherited: True

function onLoad() {
   //Hide all empty variables using the scratchpad object passed from 'Hide Empty Variables' business rule
   if(g_scratchpad.emptyVars != ''){
      var emptyVars = g_scratchpad.emptyVars.split(',');
      for(i = 0; i < emptyVars.length; i++){
         g_form.setDisplay('variables.' + emptyVars[i], false);
      }
   }
}
