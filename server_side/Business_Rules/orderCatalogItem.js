/* example use case of ordering a catalog item from a business rule 

this script orders a catalog item to update a organization id for a user if the cost center gets updated from ldap

Before - update

condtion - current.cost_center.changes()
*/



(function executeRule(current, previous /*null when async*/) {
	var new_unit = current.cost_center.u_company.u_operating_unit,
		nBook = new_unit.u_book,
		old_unit = previous.cost_center.u_company.u_operating_unit,
		oBook = old_unit.u_book;

	if(new_unit != old_unit){
		gs.log(">>>> Inside org id change if statement, new unit is " +new_unit.getDisplayValue() + " and old unit is " +old_unit.getDisplayValue());
		gs.include('Cart');
		var cart = new Cart();
		var item = cart.addItem('d2a4665b37e036800039daa543990edc'); //Org Id Update catalog item 
		var usr = current.name;
		var email = current.email;
		var usrid = current.sys_id;
		gs.log(">>>> Org Id update for " + usrid);

		cart.setVariable(item, 'orgid_fullname', usr);
		cart.setVariable(item, 'orgid_newid', new_unit.getDisplayValue() + ": " + nBook);
		cart.setVariable(item, 'orgid_oldid', old_unit.getDisplayValue() + ": " + oBook);
		cart.setVariable(item, 'orgid_email', email);
		cart.setVariable(item, 'requested_for', usrid);

		cart.placeOrder();
	}
	

})(current, previous);