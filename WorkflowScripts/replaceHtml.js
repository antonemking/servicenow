//https://community.servicenow.com/thread/211412 
// Retrieve the 'Description' HTML from the Catalog Item
var text = current.cat_item.description.getDisplayValue();
 
// Replace all <br /> tags with a CRLF
var regX1 = /<br\s\/>/ig;
var text2 = text.replace(regX1, String.fromCharCode(13));
 
// Replace all remainging HTML tags with ""
var regX2 = /(<([^>]+)>)/ig;
var finalText = text2.replace(regX2, "");
 
// Set the Catalog Task's 'Description' field to the raw text of the Catalog Items 'Description' field
task.description = finalText;