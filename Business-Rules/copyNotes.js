(function executeRule(current, previous /*null when async*/) {

var gr = new GlideRecord('sc_req_item');
gr.get(current.request_item);
gr.work_notes = current.work_notes;
gr.update();

})(current, previous);