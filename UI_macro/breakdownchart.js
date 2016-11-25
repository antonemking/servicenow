var priorArr = [];  
var openInc = [];  
var resolved = [];  
  
 
 var newIncident = new GlideAggregate('incident');
	var count = new Object();
	newIncident.addQuery('active', 'true');
	newIncident.addAggregate('COUNT');
	newIncident.query();
	count.newInc = 0;
	while(newIncident.next()){
		priorArr.push(newIncident.priority + '');
		openInc.push(newIncident.getAggregate('COUNT'));
	
		//count.newInc = newIncident.getAggregate('COUNT');
	
		var resIncident = new GlideAggregate('incident');
		resIncident.addQuery('state', 6);
		resIncident.addAggregate('COUNT');
		resIncident.query();
		count.resolvedInc = 0;
		while(resIncident.next()){
			resolved.push(resIncident.getAggregate('COUNT'));
			//count.resolvedInc = resIncident.getAggregate('COUNT'));
        }
	}