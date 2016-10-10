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
	/*
	Using bubbleChartUtils
	*/
	function incRaw(){
	var ga = new bubbleChartUtils();
	return ga.incCalcRaw();
	
	}
	
	function incToday(){
	var ga = new bubbleChartUtils();
	return ga.incCalcToday();

	}
	
	var incChange = incToday() / incRaw();
	
	function incThroughput(){
	var ga = new bubbleChartUtils();
	return ga.incCalcThroughput();
	}
	
	var riskBacklog = incThroughput() - incRaw();
	
	var riskEfficiency = (riskBacklog / incThroughput()) * 100; 
	/*
	End for incident
	*/

</g:evaluate>

<style>
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
	
</script>
	
<div style="margin:0 auto;" class="container-fluid">
	
				 <a style="text-decoration:none;" alt="" href="https://seicdstest.service-now.com/incident_list.do?sysparm_query=active%3Dtrue%5Estate!%3D6^GROUPBYpriority" target="_blank" ><div id="updateBorder" class="numberCircle">
					 <span>${whatMonth} ${day}</span>
					 <h1 style="text-decoration:none;">${incRaw()}</h1>
					
				<p>Incident Backlog</p>
					<div class="makeMeGrey"><span  style="color:#485563;">${incToday()} </span><span>(</span><span id="score">${incChange.toFixed(2)}%</span><span>)</span></div>
					 </div></a>
	</div>
	
	



</j:jelly>
