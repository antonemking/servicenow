(function calculatedFieldValue(current) {

	var y1 = parseFloat(current.u_year_1.getCurrencyValue());
	var y2 = parseFloat(current.u_year_2.getCurrencyValue());
	var y3 = parseFloat(current.u_year_3.getCurrencyValue());
	var y4 = parseFloat(current.u_year_4.getCurrencyValue());
	var y5 = parseFloat(current.u_year_5.getCurrencyValue());

	var total = y1+y2+y3+y4+y5;

	return total;  // return the calculated value

})(current);

(function calculatedFieldValue(current) {

	var h = parseFloat(current.u_hardware_total.getCurrencyValue());
	var s = parseFloat(current.u_software_total.getCurrencyValue());
	var p = parseFloat(current.u_cloud_services_total.getCurrencyValue());
	var c = parseFloat(current.u_professional_services_total.getCurrencyValue());
	

	var total = h+s+p+c;

	return total;  // return the calculated value

})(current);