addCat();
function addCat(){
	var l = new GlideRecord('u_financial');
	l.initialize();
	l.u_demand = current.sys_id;
	var fields = l.getElement('u_cost_category');
	var choices = fields.getChoices();
	
	for(var i = 0; i < choices.size(); i++){
		l.u_cost_category = choices.get(i);
		l.insert();
	}
	
	action.setRedirectURL(current);
}