var PO_PDF = Class.create();
PO_PDF.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	generatePDF : function(){
		try{
			var sysId = this.getParameter("sysparm_table_id");
			this.cleanRecord(sysId);
			var contentHtml = this.getParameter("sysparm_documentBody");
			var html = '';
			var gr =new GlideRecord("u_draft_document");
			gr.initialize();
			html = "<!DOCTYPE html> <html> <head><title>Purchase Order</title></head>";
			html +=contentHtml;
			html+="</body></html>";
			gr.u_document_html = html;
			gr.u_record_id = sysId;
			gr.insert();
			try{				
				new GeneralPOForm.generate(sysId);
			}catch(inside_error){
				gs.log("Error when calling generalPOForm " + inside_error.message);
			}
			
		}catch(ex){
			gs.log("Error on PO_PDF.generatePDF " + ex.message);
		}
	},
	cleanRecord: function(sysId){
		var gr =new GlideRecord("u_draft_document");
		gr.addQuery("u_record_id",sysId);
		gr.query();
		gr.next();
		gr.deleteRecord();
	},
	
	type: 'PO_PDF'
});