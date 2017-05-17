

var gr = new GlideRecord("sys_metadata");    
gr.addQuery("sys_scope","e317c4034f4ba6007849cb4e0210c74b"); //sys_id of the first scoped app  
gr.query();  
while(gr.next())  
{  
	gr.sys_scope = "e86d81da0fc23200459e943be1050e39"; //Update with correct scope i.e newly created scoped app 
	gr.setWorkflow(false);    
	gr.update();    
}   
