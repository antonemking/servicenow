
//aking - ptc include for spreadsheet calculator
var financeUtils = Class.create();
financeUtils.prototype = {
    initialize: function() {
    },
	
	yearRoll: function(query, year) {
	var id = current.sys_id;
	var count = 0;
	var numberField = year;
	var rg = new GlideRecord('u_financial');
	rg.addQuery('u_demand', id);
	rg.addEncodedQuery(query);
	rg.query();
	while(rg.next()){
		var n = parseFloat(rg.getValue(numberField));
		count += n;
		gs.log(">>>> count year1 " + count);

	}
	return count;
	
	},

    type: 'financeUtils'
};