(function executeRule(current, previous /*null when async*/) {

	var gr= new GlideRecord("sc_req_item");
  gr.addQuery('request',current.sys_id);
  gr.query();
  var varArr='';
  while(gr.next()){
  var set = new GlideappVariablePoolQuestionSet();
  set.setRequestID(gr.sys_id);
  set.load();
  var vs = set.getFlatQuestions();
  for (var i=0; i < vs.size(); i++) {
  if(vs.get(i).getLabel() != '') {
  varArr+=vs.get(i).getLabel() + " - " + vs.get(i).getDisplayValue()+'\n';
  }
  }
  }
  current.description=varArr;
  current.short_description = gr.variables.Request_title;

})(current, previous);