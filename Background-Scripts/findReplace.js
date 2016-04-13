//Replace 'table name here','query here if needed','field name here' ith your parameters for the comma remove
removeCommas('table name here','query here if needed','field name here');
function removeCommas(rcTableName,rcEncodedQuery,rcFieldName) {
 var grCommaRemove = new GlideRecord(rcTableName);
 grCommaRemove.addEncodedQuery(rcEncodedQuery)
 grCommaRemove.query();
 var updateCount = 0;
 while(grCommaRemove.next()){
 grCommaRemove[rcFieldName] = grCommaRemove[rcFieldName].replace(/,/g , "");
 grCommaRemove.update();
 updateCount++;
 }
 gs.print('Records Updated: '+ updateCount);
}
