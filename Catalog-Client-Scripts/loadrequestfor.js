function onLoad() { 
var userid = g_user.userName;
var cart = new GlideRecord('sc_cart');
cart.addQuery('user.user_name', userid);
cart.query();
if (cart.next()) {
var reqfor = cart.requested_for;
g_form.setValue('variables.lu_scvs_user', reqfor);
} 
}
