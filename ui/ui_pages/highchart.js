<?xml version="1.0" encoding="utf-8" ?>    
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">    

<!-- This script include is required for DUBLIN and later - Simon Morris -->
<script language="javascript" src="/scripts/prototype-adapter.jsx" />   

<!-- This script include is required for EUREKA and later - Jay Ford -->
<script language="javascript" src="/scripts/GlideV2ChartingIncludes.jsx" />   
    <g:evaluate>
    var time = [];
    var newIncidents = [];
    var resIncidents = [];
    var incidentsJson = '[';
    
        
    var gr = GlideRecord('sys_trend');
    gr.addQuery('name', 'New Incidents');
    gr.query();
    while(gr.next()){
        
        newIncidents.push(gr.value.toString());
        incidentsJson += '{"y": '+parseInt(gr.value.toString(), 10)+', "name": "'+gr.collected+'"},';
    }
        newIncidents = newIncidents.join(',');
        incidentsJson = incidentsJson.slice(0,-1);
        incidentsJson += ']';
    </g:evaluate>

<script>
    var incidentsJson = ${incidentsJson};
    var incidents = "${newIncidents}";
    var I = incidents.split(',');
    for(var i=0; i != I.length; i++) { 
    I[i] = parseInt(I[i], 10); 
    }
// Series data MUST be in INT format - Jay Ford
  
  
var demand = '3,7,9,0,8,19,5,8,9,10,13.5,12';    
var D = demand.split(',');  
for(var i=0; i != D.length; i++) { D[i] = parseInt(D[i], 10); }
    
    
document.observe("dom:loaded", function() {    

// Alerts for troubleshooting series data if required
//alert(${backIncidents});  
//alert(D);  

    var chart1 = new Highcharts.Chart({    
        chart: {
            renderTo: 'newchart',
            type: 'line'
        },
            title: {
            text: 'Backlog Growth',
            x: -20 //center
        },
     
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            
        },
        yAxis: {
            title: {
                text: 'Growth'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '#'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Incidents',
            data: [{"y": 29, "name": "2016-09-04 21:57:21"},{"y": 28, "name": "2016-09-05 21:57:22"}]
        
        }]
    });
});
</script>
  
<div id="highwrapper" style="width: 940px; height: 680px; position:relative;">
    <div id="newchart" style="min-width: 500px; height: 400px; margin: 20; position:absolute;top:0px;left:0px;"></div>
    
</div>
    <div>${newIncidents}</div>
    <div>${incidentsJson}</div>
    

</j:jelly>