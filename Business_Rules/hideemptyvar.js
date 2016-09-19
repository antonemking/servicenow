
//Name: Hide Empty Variables
//Table: Task
//When: display
//Condition: !RP.isPopup()
//Initialize the scratchpad variable
//combine this with hideemptyvar.js client script
g_scratchpad.emptyVars = '';

//Check to see if a variable pool exists
var count = 0;
for(vars in current.variable_pool){
   count++;
   break;
}

//If a variable pool exists then collect empty variable names
if(count > 0){
   var emptyVars = [];
   var table = current.getTableName();
   //Query for the empty variables for this record
   //Catalog item and task variables pull from 'sc_item_option_mtom' table
   if(table == 'sc_req_item' || table == 'sc_task'){
      var itemVars = new GlideRecord('sc_item_option_mtom');
      if(table == 'sc_req_item'){
         itemVars.addQuery('request_item', current.sys_id);
      }
      if(table == 'sc_task'){
         itemVars.addQuery('request_item', current.request_item.sys_id);
      }
      itemVars.addNullQuery('sc_item_option.value');
      //Exclude Label and Container variables
      itemVars.addQuery('sc_item_option.item_option_new.type', '!=', 11);
      itemVars.addQuery('sc_item_option.item_option_new.type', '!=', 19);
      itemVars.addQuery('sc_item_option.item_option_new.type', '!=', 20);
      itemVars.query();
      while(itemVars.next()){
         //Add variable names to the emptyVars array
         emptyVars.push(itemVars.sc_item_option.item_option_new.name.toString());
      }
   }
   else{
      //All other variables pulled from 'question_answer' table
      var producerVars = new GlideRecord('question_answer');
      producerVars.addQuery('table_sys_id', current.sys_id);
      producerVars.addNullQuery('value');
      //Exclude Label and Container variables
      producerVars.addQuery('question.type', '!=', 11);
      producerVars.addQuery('question.type', '!=', 19);
      producerVars.addQuery('question.type', '!=', 20);
      producerVars.query();
      while(producerVars.next()){
         //Add variable names to the emptyVars array
         emptyVars.push(producerVars.question.name.toString());
      }
   }

   //Store the result in the scratchpad
   g_scratchpad.emptyVars = emptyVars.join();
}
