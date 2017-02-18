   template.print("<b>Summary of Requested Item</b>: \n");  
   template.print("<i>" + gs.getProperty("glide.servlet.uri") + "</i>: \n");  
   var desc = current.sysapproval.short_description;
   var number = current.sysapproval.number;

   template.print("\n");
   template.print("Request Item " + number + ":" + desc + " \n");
   for (key in current.sysapproval.variables) {
            var v = current.sysapproval.variables[key];
            if(v.getGlideObject().getQuestion().getLabel() != '') {
                if(v.getDisplayValue() != 'false'){
                    if(v.getDisplayValue() != ''){
                    if (v != "" &amp;&amp; v != null &amp;&amp; typeof(v) != "undefined") {
                        template.space(4);
                        template.print('' +  v.getGlideObject().getQuestion().getLabel() + ": " + v.getDisplayValue() + " \n");
                        }
                    }
                }  
            }
        }
   template.print("\n");
