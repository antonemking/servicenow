/* Nuke table data */

function doit(table){
var gr = new GlideRecord(table);
//gr.addQuery('u_number', '' );
gr.query();
gr.deleteMultiple();
}
doit(table);
