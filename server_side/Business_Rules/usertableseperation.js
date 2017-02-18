//uses usefulUtils library - aking

//condition 
gs.getUser().getCompanyID() == new usefulUtils().getFieldId('core_company', 'name', 'LUTRON')

(function executeRule(current, previous /*null when async*/) {
	var idInclude = new usefulUtils();
	var id = idInclude.getFieldId('core_company', 'name', 'LUTRON');
	gs.log(">>> Company ID from BR " + id);
	current.addQuery('company', id);

})(current, previous);