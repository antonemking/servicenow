//Replace 'table name here','query here if needed','field name here' ith your parameters for the findreplace

removeAnom('table', 'encodedquery', 'element field')
function removeAnom(table, query, field){
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(query);
    gr.query();
    var updateCount = 0;
    while(gr.next()){
        gr[field] = gr[field].replace(/ (what do you want to find?/g, "'");
        gr.update();
        updateCount++;


    }
gs.print('Records updated: ' + updateCount);




}
