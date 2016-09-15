//Courtesy of http://snprotips.com/blog/sncprotips/2015/12/locate-any-record-in-any-table-by-sysidhtml

function findAnywhere(sysid, html) {
    if (html !== true && html !== 'true') { html = false; }
    var check;
    var tableName;
    var url = gs.getProperty('glide.servlet.uri');
    var table = new GlideRecord('sys_db_object');
    //Make sure we're not looking at a ts (text search) table.
    table.addEncodedQuery('sys_update_nameISNOTEMPTY^nameISNOTEMPTY^nameNOT LIKEts_'); 
    table.query();
    while (table.next()) {
        tableName = table.getValue('name');
        check = new GlideRecord(tableName);
        if (check.get(sysid)) {
            url += tableName + '.do?sys_id=' + sysid;
            if (html) {
                var htmlUrl = '<a href="' + url + '">' + url + '</a>';
                return url;
            } 
            else {
                return url;
            } 
        }
    }
} 
gs.print(findAnywhere('7a0bcb5a4fe5e600200def6d0210c716',false));