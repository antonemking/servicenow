//author Antone king
//this script will create records based on the input fields filled out in the record producer. Creating multiple records from one
//submit of a record producer. Useful for data entry forms that will insert data for data collection around Performance Analytics.
//the below Catalog Client Script will generate two records upon submittal.

function onSubmit() {

  // start the glide record and get values for the input fields
	var gr = new GlideRecord('table');
    //record producer variable names
	var field = ["example1", "example2", "example3", "example4", "example5"];
    //record producer variable names
    var field2 = ["t1", "t2", "t3" , "t4", "t5"];
	//record producer variable names
	var field3 = ["b1" , "b2", "b3" , "b4" , "b5"];
    //choice list values
    var choice = [1 , 2 , 3 , 4, 5];
    
	var date = g_form.getValue('u_date');
	var project = g_form.getValue('u_project');
	var employee = g_form.getValue('u_employee');
    
	
function glideInit() {
	//initialize the insert of values
	gr.initialize();
	//gr.u_department = department;
	gr.u_project = project;
	gr.u_date = date;
	gr.u_employee = employee;
	
}


for (var i = 0; i < field.length; i++) {
    if(g_form.getValue(field[i]) != ""){
        glideInit();
        gr.<record producer variable name> = g_form.getValue(field[i]);
        gr.<record producer variable name> = g_form.getValue(field2[i]);
        gr.<record producer variable name> = g_form.getValue(field3[i]);
        gr.<choice list> = choice[i];
        gr.insert();
    }
    
    
    
} 
    
    
    
}
