    var gdt = new GlideDate();  
    gdt.addDays(2);  
    //current.valid_to = gdt;  
    var desc = email.subject;  
    desc = desc.replace("Knowledge:","");  
    current.short_description = desc.trim();  
    current.workflow_state = "draft";  
    current.topic = "General";  
    //current.category = "";  
    current.roles = "knowledge_admin";  
      
      
    //Find and replace the image tags with the proper source.  
    //Get the number of attachments so the loop can be exited  
    //so it will stop no mater what.  
    var currentCount = 0;  
    var newBody = email.body_html;  
    var searchBody = email.body_html.replace(/\n/g, " ");  
      
      
    var regex = /<img(.*?)>/ig;  
    var match;  
    var match2;  
    while(match = regex.exec(searchBody)){  
      //Add a style float tag next to the align tag.  
      var alignText = match[0].replace(/align=['"]?left['"]?/gi, 'align="left" style="FLOAT: left"');  
      alignText = alignText.replace(/align=['"]?right['"]?/gi, 'align="right" style="FLOAT: right"');  
      searchBody = searchBody.replace(match[0], alignText);  
      var regex2 = /src=("(.)*?"|'(.)*?'|(.)*?\s+$)?/ig;  
      while(match2 = regex2.exec(alignText)){  
      findAndReplaceImage(match2[1].replace(/\s+$/,"").replace(/"+/g,"").replace(/'+/g,""));  
      }  
      currentCount += 1;  
      if(currentCount >= 100)  
      break;  
    }  
    searchBody = searchBody.replace(/<o:p>(.*?)<\/o:p>/ig, "");  
    currentCount = 0;  
    var regex2 = /<!--\[if(.*?)<!\[endif\]-->/ig;  
    while(match = regex2.exec(searchBody)){  
      searchBody = searchBody.replace(match[0], "");  
      currentCount += 1;  
      if(currentCount >= 100)  
      break;  
    }  
    currentCount = 0;  
    var regex2 = /<!\[if !vml\]>(.*?)<!\[endif\]>/ig;  
    while(match = regex2.exec(searchBody)){  
      searchBody = searchBody.replace(match[0], match[1]);  
      currentCount += 1;  
      if(currentCount >= 100)  
      break;  
    }  
      
      
    //gs.log("Create Morning Post: " + searchBody);  
      
      
    current.text = searchBody;  
      
      
    current.insert();  
      
      
    event.state="stop_processing";  
      
      
    function getEmailSYSID(emailuid) {  
      var em = new GlideRecord('sys_email');  
      em.addQuery('uid', emailuid);  
      em.query();  
      while(em.next()) {  
      //we execute the return only within a certain time difference between the creation of the attachment and now (in seconds)  
      var dif = gs.dateDiff(em.sys_created_on, gs.nowNoTZ(), true);  
      //gs.log("difference: " + dif + "eid: " + em.sys_id + " uid: " + em.uid); //debug  
      if(dif < 300 && dif > -300){  
      //gs.log('passed dif if: ' + em.sys_id + " uid: " + em.uid); //debug  
      return em.sys_id;  
      }  
      }  
      return "";  
    }  
      
      
      
    function findAndReplaceImage(imageText){  
      var img = imageText;  
      var imgName = img.substring(4, img.search(/@/i));  
      var imgCode = "sys_attachment.do?sys_id=";  
      //Get the sys_id of the attachment  
      var gr = new GlideRecord("sys_attachment");  
      gr.addQuery("file_name", imgName);  
      gr.addQuery("table_sys_id", getEmailSYSID(email.uid));  
      gr.query();  
      if (gr.next()) {  
      imgCode += gr.sys_id;  
      }  
      searchBody = searchBody.replace(img, imgCode);  
    }  