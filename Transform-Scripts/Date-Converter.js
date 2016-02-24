/*Convert mm/dd/yyyy to yyyy-mm-dd */

var str = source.u_start_date;
var res = str.split("/");
answer = newString = res[2] + "-" + res[0] + "-" + res[1];
