/*
** Purpose is to compare string input of new companies being entered into service catalog. OnChange the input is
** analyzed and a match % is returned and if the first 3 letters of a record matches that is also returned to the user. 
** This will alert the user that a normalized company name could already exist.
** To use just pass a string input to vendorCompare via AJAX.
** ToDo: Add Company Alias names to main array to be checked.
**
*/


var VendorRequestUtils = Class.create();
VendorRequestUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	vendorNameCompare : function(){
		var aliasArr = this.vendorAlias();
		var vendorNormal = this.vendorNormal();
		var newName = this.getParameter('sysparm_newName');
		var threshold = '0.60'; // Control threshold of similiarty. The lower the threshold the more matches
		var venArr = [];
		var ven = new GlideRecord('core_company');
		ven.addQuery('vendor', true);
		ven.query();
		while(ven.next()){
			var obj = {};
			var venName = String(ven.name).toLowerCase();
			venName = venName.replace(/corporation/gi, "").replace(/llc/gi, "").replace(/llp/gi, "");
			
			var firstThreeChar = this.firstThree(String(newName).toLowerCase().trim(), venName.trim());
			if(firstThreeChar != ""){
				gs.log("First Three Char Match " + firstThreeChar);
				obj.match_on_three = venName.trim();
			}
			
			var howSimiliar = this.howSimiliar(String(newName).toLowerCase().trim(), venName.trim());
			if(howSimiliar > threshold){
				obj.vendor_name = venName;
				obj.similarity_score = howSimiliar;
			}
			venArr.push(obj);
		}
		var cleanObj = venArr.filter(function(el) {
						// keep element if it's not an object, or if it's a non-empty object
						return typeof el != "object" || Array.isArray(el) || Object.keys(el).length > 0;
					});
		
		gs.log("=======> Vendor Name Comparison " + JSON.stringify(cleanObj));
		var json = new JSON();
		var data = json.encode(cleanObj);
		return data;
	},
	
	howSimiliar : function(s1, s2){
		var longer = s1;
		var shorter = s2;
		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}
		var longerLength = longer.length;
		if (longerLength == 0) {
			return 1.0;
		}
		var editDistance = this.editDistance(longer, shorter);
		return (longerLength - editDistance) / parseFloat(longerLength);
	},
	
	editDistance : function(s1, s2){
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();
		var costs = new Array();
		for (var i = 0; i <= s1.length; i++) {
			var lastValue = i;
			for (var j = 0; j <= s2.length; j++) {
				if (i == 0) {
					costs[j] = j;
				}
				else {
					if (j > 0) {
						var newValue = costs[j - 1];
						if (s1.charAt(i - 1) != s2.charAt(j - 1))
							newValue = Math.min(Math.min(newValue, lastValue),
						costs[j]) + 1;
						costs[j - 1] = lastValue;
						lastValue = newValue;
					}
				}
			}
			if (i > 0){
				costs[s2.length] = lastValue;
			}
		}
		return costs[s2.length];
	},
	
	cleanObj : function(o){
		for (var k in o) {
			if (!o[k] || typeof o[k] !== "object") {
			  continue; // If null or not an object, skip to the next iteration
			}
			clearEmpties(o[k]);
			if (Object.keys(o[k]).length === 0) {
			  delete o[k]; // The object had no properties, so delete that property
			}
		 }
	},
	
	vendorAlias : function(){
		var arr = [];
		var alias = new GlideRecord('fn_alias_value');
		alias.addEncodedQuery('config=2241c4ab375dd340231863d2b3990eca' /*config = Company Name*/);
		alias.query();
		while(alias.next()){
			var venAlias = String(alias.value).toLowerCase();
			arr.push(venAlias + '');
		}
		return arr;
	},
	
	vendorNormal : function(){
		var arr = [];
		var ven = new GlideRecord('core_company');
		ven.addEncodedQuery('vendor=true');
		ven.query();
		while(ven.next()){
			var venName = String(ven.name).toLowerCase();
			arr.push(venName + '');
		}
		return arr;
	},
	
	firstThree : function(vendor, value){
		var vendorSlice = vendor.slice(0,3);
		var oldSlice = value.slice(0,3);	
		if(vendorSlice == oldSlice){
			return value;		
		} else {
			return "";
		}
	},
	
	
	type: 'VendorRequestUtils'
});
