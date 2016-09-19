//aking - data source file parse. This takes a miscellaneous identifer slices it and matches it with a project

var dep = source.u_miscellaneous;
var proj = dep.slice(2,5);

var gr = new GlideRecord('u_prwt_project');
gr.addQuery('u_number', proj);
gr.query();
while(gr.next()){
	if (proj == 902 || proj == 904 || proj == 905){
		answer = "Corporate";
	}
answer = gr.u_name;
}	



// aking - depricated
/*var proj = source.u_project;
var gr = new GlideRecord('u_prwt_project');
gr.addQuery('u_number', proj);
gr.query();
while(gr.next()){
	if (proj == 902 || proj == 904 || proj == 905){
		answer = "Corporate";
	}
answer = gr.u_name;
}

var dep = source.u_project;

if(dep == 111){
answer="Philadelphia Tickets";
} else if (dep == 112) {
answer="Other Philadelphia";
} else if (dep == 120){
answer="Berkeley";
} else if (dep == 121){
answer="LA Tickets";
} else if (dep == 125) {
answer="Oakland";
} else if (dep == 126){
answer="NJ Surcharge";
} else if (dep == 140){
answer="Ny EzPass";
} else if (dep == 173){
answer="NJ EzPass";
} else if (dep == 268){
answer="PA SCDU";
} else if (dep == 428){
answer="IBC";
} else if (dep == 480){
answer="Merck Mail";
} else if (dep == 510){
answer="SEPTA NPT";
} else if (dep == 543){
answer="SF Parking";
} else if (dep == 621){
answer="Comp Services";
} else if (dep == 902 || dep ==  904 || dep ==  905) {
answer="Corporate";
} else if (dep == 127) {
answer="NJ Medicaid";
} else {
answer="";
}



/*var dep = source.u_project;

if(dep == 111){
answer="Philadelphia Tickets";
} else if (dep == 112) {
answer="Other Philadelphia";
} else if (dep == 120){
answer="Berkeley";
} else if (dep == 121){
answer="LA Tickets";
} else if (dep == 125) {
answer="Oakland";
} else if (dep == 126){
answer="NJ Surcharge";
} else if (dep == 140){
answer="Ny EzPass";
} else if (dep == 173){
answer="NJ EzPass";
} else if (dep == 268){
answer="PA SCDU";
} else if (dep == 428){
answer="IBC";
} else if (dep == 480){
answer="Merck Mail";
} else if (dep == 510){
answer="SEPTA NPT";
} else if (dep == 543){
answer="SF Parking";
} else if (dep == 621){
answer="Comp Services";
} else if (dep == 902 || dep ==  904 || dep ==  905) {
answer="Corporate";
} else if (dep == 127) {
answer="NJ Medicaid";
} else {
answer="";
}*/
	
/*
var dep = source.u_miscellaneous;
var split = dep.slice(2,5);

if(split == 111){
answer="Philadelphia Tickets";
} else if (split == 112) {
answer="Other Philadelphia"
} else if (split == 120){
answer="Berkeley";
} else if (split == 121){
answer="LA Tickets";
} else if (split == 125) {
answer="Oakland";
} else if (split == 127) {
answer="NJ Medicaid";
} else if (split == 126){
answer="NJ Surcharge";
} else if (split == 140){
answer="Ny EzPass";
} else if (split == 173){
answer="NJ EzPass";
} else if (split == 268){
answer="PA SCDU";
} else if (split == 428){
answer="IBC";
} else if (split == 480){
answer="Merck Mail";
} else if (split == 510){
answer="SEPTA NPT";
} else if (split == 543){
answer="SF Parking";
} else if (split == 621){
answer="Comp Services";
} else if (split == 902 || split == 904 || split == 905) {
answer="Corporate";
} else{
answer=""
}*/
	