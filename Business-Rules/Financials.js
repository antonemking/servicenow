function totalCalc(){
var total = 0;
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
if(total != 0)
{
var calc = parseFloat(array[total - 1]);
var sum2 = calc + parseFloat(array[total]);
gs.print(">>> SUM " + sum2);

}

total++;

}
return sum2;
}
}

var f = new GlideRecord('u_financial');
f.addQuery('u_demand', 'ac6282c1dbc522009c99fbefbf961918');
f.addQuery('u_cost_category', 'STARTSWITH', "hardware");
f.query();
while(f.next()){
	f.u_hardware_total = totalCalc();
	f.update();
}
831 7781 