//aking - use scratchpad to get server side information to pass to client side.

(function executeRule(current, previous /*null when async*/) {
	var userObject = gs.getUser();
	g_scratchpad.domain = userObject.getCompanyID();
	gs.log(">>>>> Company ID is " + g_scratchpad.domain);
})(current, previous);