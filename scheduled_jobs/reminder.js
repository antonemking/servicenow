/* Run job everyday against problem record to send reminder emails to the assigned to every other day for a problem ticket 
Only send reminder if reminder count field can be divisble by 2 simulating an every other day window
*/

(function sendReminder(){
	var gr = new GlideRecord('problem');
	gr.addQuery('active', true);
	gr.addNotNullQuery('assigned_to');
	gr.query();
		while(gr.next()){
			gr.u_reminder_count += 1;
			
			if(gr.u_reminder_count % 2 == 0) {
				gs.eventQueue('problem.email_reminder', gr, gr.assigned_to, gr.assigned_to.getDisplayValue());
				gs.log(">>> Sending email reminder to  " + gr.assigned_to.getDisplayValue() + " for problem record " + gr.number);
				gr.u_reminders_sent += 1;
				
			}
			gr.update();
		}
	
})();