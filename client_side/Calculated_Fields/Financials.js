(function calculatedFieldValue(current) {

	var y1 = parseFloat(current.u_year_1.getCurrencyValue());
	var y2 = parseFloat(current.u_year_2.getCurrencyValue());
	var y3 = parseFloat(current.u_year_3.getCurrencyValue());
	var y4 = parseFloat(current.u_year_4.getCurrencyValue());
	var y5 = parseFloat(current.u_year_5.getCurrencyValue());

	var total = y1+y2+y3+y4+y5;

	return total;  // return the calculated value

})(current);


(function calculatedFieldValue(current) {
var id = ac6282c1dbc522009c99fbefbf961918;
var gr = new GlideRecord('u_financial');
gr.addQuery('u_demand', id);
gs.log(">>> Sys ID " + id);
gr.query();
while(gr.next()){
if(gr.u_cost_category == "Hardware Purchases"){
	var value1 = parseFloat(current.u_total.getCurrencyValue());

}
if(gr.u_cost_category == "Hardware Maintenance"){
	var value2 = parseFloat(current.u_total.getCurrencyValue());

}

}

	return value1 + value2;  // return the calculated value

})(current);


var total = 0
var array = new Array();
array[total] = new Array();
var rg = new GlideRecord('dmn_demand');
rg.addQuery('sys_id', 'ac6282c1dbc522009c99fbefbf961918');
rg.query();
while(rg.next()){
var gr = new GlideAggregate('u_financial');
gr.addQuery('u_demand', rg.sys_id);
gr.addQuery('u_cost_category', 'STARTSWITH', "hardware");
gr.addAggregate('SUM', 'u_total');
gs.log(">>> Sys ID " + rg.number);
gr.query();
while(gr.next()){
var sum = gr.getAggregate('SUM', 'u_total');
array[total] = sum;
if( total != 0)
{
var calc = parseFloat(array[total - 1]);
var sum2 = calc + parseFloat(array[total])
gs.print(">>> SUM " + sum2);
}
total++;

}

}