<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
	<g:requires name="angular.min.jsdbx" />
	<g:requires name="kpi_table_dropdown_menu.jsdbx" />
<g:evaluate object="true">
	<!--active=true^opened_at@javascript:gs.daysAgoStart(0)-->
	var rightNow = gs.now();
	var gdt = new GlideDateTime();
	var month = gdt.getMonth();
	var whatMonth = '';
	var day = gdt.getDayOfMonth();
	if(month == 1){
	whatMonth = "Jan";
	} else if(month == 2) {
	whatMonth = "Feb";
	}
	else if(month == 3) {
	whatMonth = "Mar";
	}
	else if(month == 4) {
	whatMonth = "Apr";
	}
	else if(month == 5) {
	whatMonth = "May";
	}
	else if(month == 6) {
	whatMonth = "Jun";
	}
	else if(month == 7) {
	whatMonth = "Jul";
	}else if(month == 8) {
	whatMonth = "Aug";
	}else if(month == 9) {
	whatMonth = "Sep";
	}else if(month == 10) {
	whatMonth = "Oct";
	}else if(month == 11) {
	whatMonth = "Nov";
	}else  {
	whatMonth = "Dec";
	}
function incBackLog(value){
    var newIncident = new GlideAggregate('incident');
	var count = new Object();
	newIncident.addEncodedQuery('active=true^opened_at&lt;javascript:gs.daysAgoStart(0)');
	newIncident.addQuery('active', 'true');
	newIncident.addQuery('state', '!=', 6);
	newIncident.addQuery('priority', value);
	newIncident.addAggregate('COUNT', 'priority');
	newIncident.query();
	count.newInc = 0;
	if (newIncident.next())
	
		count.newInc = newIncident.getAggregate('COUNT', 'priority');
	/*
	var resIncident = new GlideAggregate('incident');
	resIncident.addQuery('state', 6)
	resIncident.addQuery('priority', value);
	
	resIncident.addAggregate('COUNT', 'priority');
	resIncident.query();
	count.resolvedInc = 0;
	if (resIncident.next())
		count.resolvedInc = resIncident.getAggregate('COUNT', 'priority');
	*/
	
	return count.newInc;
	}
	var incBackLogP1 = parseInt(incBackLog(1), 10);
	var incBackLogHigh = parseInt(incBackLog(2), 10);
	var incBackLogMed = parseInt(incBackLog(3), 10);
	var incBackLogLow = parseInt(incBackLog(4), 10);
	
	var incTotalBackTest = (incBackLogP1 + incBackLogHigh + incBackLogMed + incBackLogLow).toFixed(0);
	
function incTotal(){
    var newIncident = new GlideAggregate('incident');
	var count = new Object();
	newIncident.addAggregate('COUNT');
	newIncident.addQuery('active' , 'true');
	newIncident.addQuery('state', '!=', 6);
	//newIncident.addEncodedQuery('active=true^opened_at&lt;javascript:gs.daysAgoStart(0)');
	newIncident.query();
	count.newInc = 0;
	if (newIncident.next())
	
		count.newInc = newIncident.getAggregate('COUNT');
	/*
	var resIncident = new GlideAggregate('incident');
	resIncident.addQuery('state', 6)
	resIncident.addAggregate('COUNT');
	resIncident.query();
	count.resolvedInc = 0;
	if (resIncident.next())
	count.resolvedInc = resIncident.getAggregate('COUNT');*/

	return count.newInc;
	}
	
	var incTotalBack = incTotal();

	//////////////////////////////////////////////////////////////
	function reqItemBackLog(value){
	var newRequest = new GlideAggregate('sc_req_item');
	var count = new Object();
	newRequest.addEncodedQuery('active=true^opened_at&lt;javascript:gs.daysAgoStart(0)');
	newRequest.addQuery('active', 'true');
	newRequest.addAggregate('COUNT', 'state');
    newRequest.addQuery('state', value);
    newRequest.addQuery('state', '!=', -3);
	newRequest.query();
	count.newReq = 0;
	if (newRequest.next())
		count.newReq = newRequest.getAggregate('COUNT', 'state');
	
	return count.newReq;
	}
var reqItemBackLogSub = parseInt(reqItemBackLog(1), 10);
var reqItemBackLogInProgress = parseInt(reqItemBackLog(2), 10);
var reqItemBackLogApproval = parseInt(reqItemBackLog(-5), 10);
var reqItemBackLogReview = parseInt(reqItemBackLog(-1), 10);
var reqItemBackLogReturned = parseInt(reqItemBackLog(-2), 10);
	
function reqItemTotal(){
	var newRequest = new GlideAggregate('sc_req_item');
	var count = new Object();
	newRequest.addAggregate('COUNT');
	//newRequest.addEncodedQuery('active=true^opened_at&lt;javascript:gs.daysAgoStart(0)');
	newRequest.addQuery('active','true');
    newRequest.addQuery('state', '!=', -3);
	newRequest.query();
	count.newReq = 0;
	if (newRequest.next())
		count.newReq = newRequest.getAggregate('COUNT');
	
	return count.newReq;
	}
	var reqItemTotalBack = reqItemTotal();
	/////////////////////////////////////////////////////////////
function demandBackLog(value){
var newDemand = new GlideAggregate('dmn_demand');
var count = new Object();
	newDemand.addQuery('active', 'true');
	newDemand.addEncodedQuery('active=true^opened_at&lt;javascript:gs.daysAgoStart(0)');
newDemand.addQuery('state', '!=', 9);
newDemand.addQuery('priority', value)
	newDemand.addAggregate('COUNT', 'priority');
	newDemand.query();
	count.newDem = 0;
	if (newDemand.next())
		count.newDem = newDemand.getAggregate('COUNT', 'priority');

	return count.newDem;
	
}
var demBackLogTop5 = demandBackLog(1);
	var demBackLogMed = demandBackLog(3);
	var demBackLogLow = demandBackLog(4);
	
function demandTotal(){
var newDemand = new GlideAggregate('dmn_demand');
var count = new Object();
	newDemand.addQuery('active', 'true');
	newDemand.addQuery('state', '!=', 9);
	newDemand.addAggregate('COUNT');
	newDemand.query();
	count.newDem = 0;
	if (newDemand.next())
		count.newDem = newDemand.getAggregate('COUNT');

	return count.newDem;
	
}
var demTotal = demandTotal();	
	 
 	////////////////////////////////////% Change/////////////////////
	function pChangeReq1(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', 'state');
	pInc.addQuery('active','true');
pInc.addQuery('state', 1);

	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', 'state');
	}
	return amount;
	}
	function pChangeReq2(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', 'state');
	pInc.addQuery('active','true');
pInc.addQuery('state', 2);

	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', 'state');
	}
	return amount;
	}
	function pChangeReq3(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', 'state');
	pInc.addQuery('active','true');
pInc.addQuery('state', -5);

	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', 'state');
	}
	return amount;
	}
	
	function pChangeReq4(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', 'state');
	pInc.addQuery('active','true');
pInc.addQuery('state', -1);

	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', 'state');
	}
	return amount;
	}
	function pChangeReq5(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', 'state');
	pInc.addQuery('active','true');
pInc.addQuery('state', -2);

	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', 'state');
	}
	return amount;
	}
	function pChange(table, value , agg){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
	pInc.addAggregate('COUNT', agg);
	pInc.addQuery('priority', value);
	
	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT', agg);
	}else {
	amount = 0.0;
	}
	return amount;
	}
	function pChange2(table){
	
	var pInc = new GlideAggregate(table);
	pInc.addEncodedQuery('active=true^opened_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)');
        pInc.addQuery('active', 'true');
	pInc.addAggregate('COUNT');
	pInc.query();
	var amount = 0;
	if(pInc.next()){
	amount = pInc.getAggregate('COUNT');
	}else {
	amount = "0.0";
	}
	return amount;
	}
	
	var calcChange = Math.abs(incBackLogP1) / pChange('incident', 1 , 'priority');
	var calcChangeA = 100 / calcChange;
	
	var calcChange2 = Math.abs(incBackLogMed) / pChange('incident', 3, 'priority');
	var calcChangeB = 100 / calcChange2;
	
	var calcChange3 = Math.abs(incBackLogHigh) / pChange('incident', 2 , 'priority');
	var calcChangeC = 100 / calcChange3;
	
	var calcChange4 = Math.abs(incBackLogLow) / pChange('incident', 4, 'priority');
	var calcChangeD= 100 / calcChange4;
	////////req item/////////////////////////////
	var calcChangeReq = Math.abs(reqItemBackLogSub) / pChangeReq1('sc_req_item');
	var calcChangeReqA = 100 / calcChangeReq;
	
	var calcChangeReq1 = Math.abs(reqItemBackLogInProgress) / pChangeReq2('sc_req_item');
	var calcChangeReqB = 100 / calcChangeReq1;
	
	var calcChangeReq2 = Math.abs(reqItemBackLogApproval) / pChangeReq3('sc_req_item');
	var calcChangeReqC = 100 / calcChangeReq2;
	
	var calcChangeReq3 = Math.abs(reqItemBackLogReview) / pChangeReq4('sc_req_item');
	var calcChangeReqD = 100 / calcChangeReq3;
	
	var calcChangeReq4 = Math.abs(reqItemBackLogReturned) / pChangeReq5('sc_req_item');
	var calcChangeReqD = 100 / calcChangeReq4;
	/////////////////Demand/////////////////////////
	var calcChangeDem = Math.abs(demBackLogTop5) / pChange('dmn_demand', 1 , 'priority');
	var calcChangeDemA = 100 / calcChangeDem;
	
	var calcChangeDem1 = Math.abs(demBackLogMed) / pChange('dmn_demand', 3, 'priority');
	var calcChangeDemB = 100 / calcChangeDem1;
	
	var calcChangeDem2 = Math.abs(demBackLogLow) / pChange('dmn_demand', 4 , 'priority');
	var calcChangeDemC = 100 / calcChangeDem2;
	
	var calcChange5 = Math.abs(incTotalBackTest) / pChange2('incident');
	var calcChangeE = 100 / calcChange5;
	
	var calcChange6 = Math.abs(reqItemTotalBack) / pChange2('sc_req_item');
	var calcChangeF = 100 / calcChange6;
	
	var calcChange7 = Math.abs(demTotal) / pChange2('dmn_demand');
	var calcChangeG = 100 / calcChange7;
	
	
	
	
	
	
	
	
</g:evaluate>

<style>
	.table {
    border-bottom:0px !important;
	
}
.table th, .table td {
    border: 1px !important;
	font-size:20px;
}
.fixed-table-container {
    border:0px !important;
}
	.numberCircle {
		border-radius: 50%;
		behavior: url(PIE.htc); /* remove if you don't care about IE8 */
		margin: 0 auto;
	
		width: 155px;
		height: 155px;
		padding: 12px;
		

		//background: #fff;
		border: 3px solid #485563;
		color: #485563;
		text-align: center;
		
		

	}
	.numberCircleRed {
		border-radius: 50%;
		behavior: url(PIE.htc); /* remove if you don't care about IE8 */
		margin: 0 auto;
	
		width: 155px;
		height: 155px;
		padding: 12px;
		

		//background: #fff;
		border: .2px solid tomato;
		color: black;
		text-align: center;

	   }
	
	.numberCircleYellow {
		border-radius: 50%;
		behavior: url(PIE.htc); /* remove if you don't care about IE8 */
		margin: 0 auto;
	
		width: 144px;
		height: 144px;
		padding: 12px;
		

		//background: #fff;
		border: .2px solid #fcc742;
		color: black;
		text-align: center;

	   }
	
	
	.numberCircle:hover{
	border-color: #7cb5ec;
	}
	h1 {
	color:#485563;
	}
	span{
	color:#485563;
	}
	.makeMeGrey{
	
	color:#485563;
	}
	p{
	color:#485563;
	}

</style>
	
	<script>
$j(function () {
    // Score Color
		var score = parseInt($j('#score').text().trim(), 10);
    var color = '#485563';
    if (!isNaN(score)) {
        if (score >= 7) {
            color = '#fcc742';
        }
        if (score >= 10) {
            color = 'tomato';
        }
        $j('#updateBorder').css('border-color',color);
    }
});

		
$j(function () {
    // Score Color
		var score2 = parseInt($j('#score2').text().trim(), 10);
    var color = '#485563';
    if (!isNaN(score2)) {
        if (score2 >= 7) {
            color = '#fcc742';
        }
        if (score2 >= 10) {
            color = 'tomato';
        }
        $j('#updateBorder2').css('border-color', color);
    }
});
		
$j(function () {
    // Score Color
		var score3 = parseInt($j('#score3').text().trim(), 10);
    var color = '#485563';
    if (!isNaN(score3)) {
        if (score3 >= 7) {
            color = '#fcc742';
        }
        if (score3 >= 10) {
            color = 'tomato';
        }
        $j('#updateBorder3').css('border-color', color);
    }
});
		
$j(document).ready(function(){

    $j("select").change(function(){
        $j(this).find("option:selected").each(function(){
            if($j(this).attr("value")=="red"){
                $j(".box").not(".red").hide();
                $j(".red").show();
            }
            else if($j(this).attr("value")=="green"){
                $j(".box").not(".green").hide();
                $j(".green").show();
            }
            else if($j(this).attr("value")=="blue"){
                $j(".box").not(".blue").hide();
                $j(".blue").show();
            }
		else if($j(this).attr("value")=="purple"){
                $j(".box").not(".purple").hide();
                $j(".purple").show();
            }
            else{
                $j(".box").hide();
            }
        });
    }).change();
		
		});

		
	
</script>
	
<div style="margin:0 auto;" class="container-fluid">
	<div ng-controller="">
	<div class="row">
		<div class="col-xs-2">
		<select class="form-control show-tick">
            <option  value="purple">Choose a KPI</option>
            <option  value="red">Incident</option>
            <option  value="green">Request Item</option>
            <option  value="blue">Demand</option>
        </select>
		</div>
		
		<div class="col-xs-8 purple box">
	<div class="col-md-3" > 
				 <a style="text-decoration:none;" alt="" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Estate!%3D6^GROUPBYpriority" target="_blank" ><div id="updateBorder" class="numberCircle">
					 <span>${whatMonth} ${day}</span>
					 <h1 style="text-decoration:none;">${incTotalBack}</h1>
					
				<p>Active Incidents</p>
					 <a target="_blank" style="text-decoration-color:#485563" alt="" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Eopened_atONToday%40javascript%3Ags.daysAgoStart(0)%40javascript%3Ags.daysAgoEnd(0)"><div class="makeMeGrey"><span  style="color:#485563;">${pChange2('incident')} </span><span>(</span><span id="score">${calcChangeE.toFixed(2)}%</span><span>)</span></div></a>
					 </div></a>
				
			</div>
			<div class="col-xs-1"></div>
			<div class="col-md-3"> 
				<a style="text-decoration:none;" alt="" target="_blank" href="https://seicdstest.service-now.com/sc_req_item_list.do?sysparm_query=active%3Dtrue%5Estate!%3D-3^GROUPBYassignment_group" ><div id="updateBorder2" class="numberCircle">
					<span>${whatMonth} ${day}</span>
					<h1>${reqItemTotalBack}</h1>
				<p>Open Req Items</p>
					<a target="_blank" alt="" href="https://seicdstest.service-now.com/sc_req_item_list.do?sysparm_query=active%3Dtrue%5Eopened_atONToday%40javascript%3Ags.daysAgoStart(0)%40javascript%3Ags.daysAgoEnd(0)"><div class="makeMeGrey"><span>${pChange2('sc_req_item')} </span><span>(</span><span id="score2">${calcChangeF.toFixed(2)}%</span><span>)</span></div></a>
				</div></a>
				
				</div>
			<div class="col-xs-1"></div>
			<div class="col-md-3"> 
				<a style="text-decoration:none;" alt="" target="_blank" href="https://seicdstest.service-now.com/dmn_demand_list.do?sysparm_query=active%3Dtrue%5Estate!%3D9^GROUPBYcmdb_ci.parent"><div id="updateBorder3" class="numberCircle">
					<span>${whatMonth} ${day}</span>
					<h1>${demTotal}</h1>
				<p>Open Demands </p>
					<a target="_blank" alt="" href="https://seicdstest.service-now.com/dmn_demand_list.do?sysparm_query=active%3Dtrue%5Eopened_atONToday%40javascript%3Ags.daysAgoStart(0)%40javascript%3Ags.daysAgoEnd(0)"><div class="makeMeGrey"><span>${pChange2('dmn_demand')} </span><span>(</span><span id="score3">${calcChangeG.toFixed(2)}%</span><span>)</span></div></a>
					</div></a>
				
			</div>
			
			
			</div>
			
		

</div>
	</div>
	<div class="row">
		<div class="col-xs-1"></div>
	<div class="col-xs-10 red box">
       <table class="table">
  <thead>
    <tr>
      
      <th>Incident Backlog</th>
      <th style="text-align:center">${whatMonth} ${day}</th>
      <th style="text-align:center">Change Today </th>
    </tr>
  </thead>
		   
  <tbody>
    <tr>
      
      <td><a alt="" target="_blank" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Epriority%3D1%5Estate!%3D6^GROUPBYpriority^priority=1">P1</a></td>
	<td style="text-align:center">${incBackLogP1}</td>
      <td style="text-align:center">${calcChangeA.toFixed(2)}%</td>
    </tr>
    <tr>
      
		<td><a alt="" target="_blank" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Estate!%3D6%5Epriority%3D2^GROUPBYpriority^priority2">High</a></td>
      <td style="text-align:center">${incBackLogHigh}</td>
      <td style="text-align:center">${calcChangeC.toFixed(2)}%</td>
    </tr>
    <tr>
    
		<td><a alt="" target="_blank" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Epriority%3D3%5Estate!%3D6^GROUPBYpriority^priority=3">Medium</a></td>
      <td style="text-align:center">${incBackLogMed}</td>
      <td style="text-align:center">${calcChangeB.toFixed(2)}%</td>
    </tr>
	  <tr>
		  <td><a alt="" target="_blank" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Epriority%3D4%5Estate!%3D6^GROUPBYpriority^priority=4">Low</a></td>
      <td style="text-align:center">${incBackLogLow}</td>
      <td style="text-align:center">${calcChangeD.toFixed(2)}%</td>
    </tr>
  </tbody>
</table>
		
	</div>
		
	<div class="col-xs-2">
<!-- Large button group -->
		
		</div>
		</div>
	<div class="row">
		<div class="col-xs-1"></div>
		<div class="col-xs-10 green box">
		<table class="table">
  <thead>
    <tr>
      
      <th>Req Item Backlog</th>
      <th style="text-align:center">${whatMonth} ${day}</th>
      <th style="text-align:center">Change Today </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Pending Approval</td>
      <td style="text-align:center">${reqItemBackLogApproval}</td>
      <td style="text-align:center">${calcChangeReqC.toFixed(2)}%</td>
    </tr>
    <tr>
      
      <td>Returned</td>
      <td style="text-align:center">${reqItemBackLogReturned}</td>
      <td style="text-align:center">${calcChangeReqD}%</td>
    </tr>
    <tr>
    
      <td>Review</td>
      <td style="text-align:center">${reqItemBackLogReview}</td>
      <td style="text-align:center">${calcChangeReqD}%</td>
    </tr>
	  <tr>
      <td>Submitted</td>
      <td style="text-align:center">${reqItemBackLogSub}</td>
      <td style="text-align:center">${calcChangeReqA.toFixed(2)}%</td>
    </tr>
	  <tr>
      <td>In Progress</td>
      <td style="text-align:center">${reqItemBackLogInProgress}</td>
      <td style="text-align:center">${calcChangeReqB}%</td>
    </tr>
  </tbody>
</table>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xs-1"></div>
		<div class="col-xs-10 blue box">
		<table class="table">
  <thead>
    <tr>
      
      <th>Demand Backlog</th> 
      <th style="text-align:center">${whatMonth} ${day}</th>
      <th style="text-align:center">Change Today </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Top 5</td>
      <td style="text-align:center">${demBackLogTop5}</td>
      <td style="text-align:center">${calcChangeDemA.toFixed(2)}%</td>
    </tr>
    <tr>
      
      <td>Medium</td>
      <td style="text-align:center">${demBackLogMed}</td>
      <td style="text-align:center">${calcChangeDemB.toFixed(2)}%</td>
    </tr>
    <tr>
    
      <td>Low</td>
      <td style="text-align:center">${demBackLogLow}</td>
      <td style="text-align:center">${calcChangeDemC.toFixed(2)}%</td>
    </tr>
  </tbody>
</table>
		</div>
	</div>
</div>
	
	



</j:jelly>
