/*
 * Author: Jeff Schodde, Senior Technical Consultant at ServiceNow
 * Date: July 1, 2015
 *
 * Description: This script will read each user record and their related roles to determine
 * if they are one of the following types: Administrator, Approver, Fulfiller, Requester and Other.
 *
 * Prerequisites: A new field called "u_type" should be added to the sys_user table.
 * The data type is "choice" and should contain the following choices:
 *
 *  Label / Value
 * -------------------------------
 *	Administrator / administrator
 *	Approver / approver
 *	Fulfiller / fulfiller
 *	Requester / requester
 *	Other / other
 *  
 *  Usage: Set up a scheduled job to run this code on a schedule, especially if you maintain your user profiles from an LDAP feed.
 *
 *  Limitations: If you are using non-standard roles from baseline, then this script will not work for you. You will need to tailor it accordingly.
 *
 *  Tag sys_users with admin, approver, fulfuller, reuqester, or other
 */

checkRoles();

function checkRoles() {

	try {
		var arrayUtil = new ArrayUtil();
		var theUserType = '';
		var totalUsers = 0;

		var grUser = new GlideRecord("sys_user");
		
		if (!grUser.isValidField('x_20227_dashboard_u_type')) {
			gs.info('The scheduled job "User Role Checker" cannot find the "u_type" field defined in the "sys_user" table');
			return ;
		}
			
		grUser.addQuery("active", true);
		grUser.query();
		while (grUser.next()) {
			totalUsers += 1;
			var theUser = grUser.sys_id;
			var theUserRoles = getRoles(theUser); // get an array of user roles
			var roleCount = theUserRoles.length; // count how many roles the use has

			// If the user has no roles, then they are a 'requester'.
			if (roleCount === 0) {
				grUser.x_20227_dashboard_u_type = 'requester';
				grUser.update();
				continue;
			
			// If the user has only ONE role and it's 'approver_user', then they are an 'approver'.
			} else if (roleCount == 1 && arrayUtil.contains(theUserRoles, 'approver_user')) {
				grUser.x_20227_dashboard_u_type = 'approver';
				grUser.update();
				continue;
			
			// If the user has multiple roles and one of them is 'admin', then they are an 'administrator'.
			} else if (roleCount > 0 && arrayUtil.contains(theUserRoles, 'admin')) {
				grUser.x_20227_dashboard_u_type = 'administrator';
				grUser.update();
				continue;
			
			// If the user has more than one role and did not have the 'admin' role, then they are a 'fulfiller'.
			} else if (roleCount > 0) {
				grUser.x_20227_dashboard_u_type = 'fulfiller';
				grUser.update();
				continue;
				
			// If none of the previous conditions were met, then consider the user as 'other'.
			} else {
				grUser.x_20227_dashboard_u_type = 'other';
				grUser.update();
			}
		}

		gs.info("User Role Checker processed " + totalUsers + " user records on " + gs.nowDateTime());

	} catch (e) {
		gs.info("Error in scheduled job 'User Role Checker' on line " + e.lineNumber + ": " + e);
	}
}

function getRoles(userId) {
	try {
		var theRoles = [];

		var gr = new GlideRecord('sys_user_has_role');
		gr.addQuery('user', userId);
		gr.query();

		while (gr.next()) {
			var theRoleName = gr.role.name.toLowerCase();
			theRoles.push(theRoleName);
		}
		return theRoles;
	} catch (e) {
		gs.info("Error in scheduled job 'User Role Checker > getRoles()' on line " + e.lineNumber + ": " + e);
	}
}
