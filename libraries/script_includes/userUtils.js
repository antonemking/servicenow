var userUtils = Class.create();
userUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	getInfo: function(value){
		var gr = new GlideRecord('sys_user');
		gr.get(this.getParameter('sysparm_user_info'));
		return gr.value;
		
		
	},
	
    type: 'userUtils'
});