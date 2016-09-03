<?xml version="1.0" encoding="utf-8" ?>    
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">    

<!-- This script include is required for DUBLIN and later - Simon Morris -->
<script language="javascript" src="/scripts/prototype-adapter.jsx" />   

<!-- This script include is required for EUREKA and later - Jay Ford -->
<script language="javascript" src="/scripts/GlideV2ChartingIncludes.jsx" />   


<script>  

var incident = '1,5,4,6,7,8,12,10,2,5,13,10';    
var I = incident.split(',');  
for(var i=0; i != I.length; i++) { I[i] = parseInt(I[i], 10); }
// Series data MUST be in INT format - Jay Ford
  
  
var demand = '3,7,9,0,8,19,5,8,9,10,13.5,12';    
var D = demand.split(',');  
for(var i=0; i != D.length; i++) { D[i] = parseInt(D[i], 10); }
    
    
document.observe("dom:loaded", function() {    

// Alerts for troubleshooting series data if required
//alert(I);  
//alert(D);  

    var chart1 = new Highcharts.Chart({    
    
        chart: {    
            renderTo: 'newchart',    
            type: 'line'    
        },    
    
        title: {    
            text: 'Incident/Demand Backlog Growth'    
        },    
        
        credits: {
            enabled: false
        },    
        
        xAxis: {    
            categories:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']   
        },    
    
        yAxis: {    
            title: {    
                text: 'Backlog Growth'    
            }    
        },    
    
        series: [{     
                name: 'Incident',     
                data: I    
            },     
            {     
                name: 'Demand',     
                data: D    
        }]     
    }); // end var chart1
}); // end document observe
</script>
  
<div id="highwrapper" style="width: 940px; height: 680px; position:relative;">
    <div id="newchart" style="width: 600px; height: 600px; margin: 20; position:absolute;top:0px;left:0px;"></div>
</div>

</j:jelly>