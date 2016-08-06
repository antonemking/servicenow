function onAfter(current, previous){
   //This function will be automatically called when this rule is processed.
/*	
var pQuery = 'u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7';
var hQuery = 'u_cost_category=1^ORu_cost_category=2';
var sQuery = 'u_cost_category=3^ORu_cost_category=4';
var cQuery = 'u_cost_category=8';
//aking total queries
var ptQuery = 'u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7';
var htQuery = 'u_cost_category=1^ORu_cost_category=2';
var stQuery = 'u_cost_category=3^ORu_cost_category=4';
var ctQuery= 'u_cost_category=8';

current.u_hardware_total = totalCalc(hQuery);
current.u_software_total = totalCalc(sQuery);
current.u_cloud_services_total = totalCalc(cQuery);
gs.log(">>>>> Cloud " + totalCalc(cQuery));
current.u_professional_services_total = totalCalc(pQuery);
current.update();

function totalCalc(query){
var rg = new GlideRecord('dmn_demand');
rg.addQuery('sys_id', current.sys_id);
rg.query();
if(rg.next()){
var count = 0;
var numberField = 'u_total';
var gr = new GlideRecord('u_financial');
gr.addQuery('u_demand', rg.sys_id);
gr.addEncodedQuery(query);
gr.query();
while(gr.next()){
var n = parseFloat(rg.getValue(numberField));
count += n;

}
}
return count;

}*/

totalRoll();
function totalRoll(){
var superQuery = 'u_cost_category=1^ORu_cost_category=2^ORu_cost_category=3^ORu_cost_category=4^ORu_cost_category=8^ORu_cost_category=5^ORu_cost_category=6^ORu_cost_category=7';
var f = new financeUtils();
	gs.log(">> fianance Utils Total " + f.yearRoll('u_cost_category=9^ORu_cost_category=10^ORu_cost_category=11^ORu_cost_category=12', 'u_year_1'));
	var gr = new GlideRecord('u_financial');
	gr.addQuery('u_demand', current.sys_id);
	gs.log(" >>>>> sys id " + current.sys_id);
	gr.addEncodedQuery('u_cost_category=13');
	gr.query();
	if(gr.next()){
	gr.u_year_1 = f.yearRoll(superQuery, 'u_year_1');
		gr.u_year_2 = f.yearRoll(superQuery, 'u_year_2');
		gr.u_year_3 = f.yearRoll(superQuery, 'u_year_3');
		gr.u_year_4 = f.yearRoll(superQuery, 'u_year_4');
		gr.u_year_5 = f.yearRoll(superQuery, 'u_year_5');
		gr.update();
	}


}
	
hardRoll();
function hardRoll(){
	var f = new financeUtils();
	gs.log(">> fianance Utils hardware" + f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_1'));
	var gr = new GlideRecord('u_financial');
	gr.addQuery('u_demand', current.sys_id);
	gs.log(" >>>>> sys id " + current.sys_id);
	gr.addEncodedQuery('u_cost_category=9');
	gr.query();
	if(gr.next()){
	gr.u_year_1 = f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_1');
		gr.u_year_2 = f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_2');
		gr.u_year_3 = f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_3');
		gr.u_year_4 = f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_4');
		gr.u_year_5 = f.yearRoll('u_cost_category=1^ORu_cost_category=2', 'u_year_5');
		gr.update();
	}
	
}
	
	softRoll();
function softRoll(){
	var f = new financeUtils();
	gs.log(">> fianance Utils software" + f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_1'));
	var gr = new GlideRecord('u_financial');
	gr.addQuery('u_demand', current.sys_id);
	gs.log(" >>>>> sys id " + current.sys_id);
	gr.addEncodedQuery('u_cost_category=10');
	gr.query();
	if(gr.next()){
	gr.u_year_1 = f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_1');
		gr.u_year_2 = f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_2');
		gr.u_year_3 = f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_3');
		gr.u_year_4 = f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_4');
		gr.u_year_5 = f.yearRoll('u_cost_category=3^ORu_cost_category=4', 'u_year_5');
		gr.update();
	}
	
}
	cloudRoll();
function cloudRoll(){
	var f = new financeUtils();
	gs.log(">> fianance Utils cloud " + f.yearRoll('u_cost_category=8', 'u_year_1'));
	var gr = new GlideRecord('u_financial');
	gr.addQuery('u_demand', current.sys_id);
	gs.log(" >>>>> sys id " + current.sys_id);
	gr.addEncodedQuery('u_cost_category=11');
	gr.query();
	if(gr.next()){
	gr.u_year_1 = f.yearRoll('u_cost_category=8', 'u_year_1');
		gr.u_year_2 = f.yearRoll('u_cost_category=8', 'u_year_2');
		gr.u_year_3 = f.yearRoll('u_cost_category=8', 'u_year_3');
		gr.u_year_4 = f.yearRoll('u_cost_category=8', 'u_year_4');
		gr.u_year_5 = f.yearRoll('u_cost_category=8', 'u_year_5');
		gr.update();
	}
	
}
	profRoll();
function profRoll(){
	var f = new financeUtils();
	gs.log(">> fianance Utils prof " + f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_1'));
	var gr = new GlideRecord('u_financial');
	gr.addQuery('u_demand', current.sys_id);
	gs.log(" >>>>> sys id " + current.sys_id);
	gr.addEncodedQuery('u_cost_category=12');
	gr.query();
	if(gr.next()){
	gr.u_year_1 = f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_1');
		gr.u_year_2 = f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_2');
		gr.u_year_3 = f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_3');
		gr.u_year_4 = f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_4');
		gr.u_year_5 = f.yearRoll('u_cost_category=5^ORu_cost_category=6^ORu_cost_category=7', 'u_year_5');
		gr.update();
	}
	
}



}
