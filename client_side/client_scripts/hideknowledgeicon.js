//aking - using getcompanyid business rule to pass the id from the server.

function onLoad() {  
   //Hide the kb icon for users that are apart of Lutron 
   var comp = '976a049d6fb8d600040636412e3ee499'; //Check if user is associated with Lutron Company
   if(comp == g_scratchpad.domain){  
       
         //find the knowledge icon by class
         
   document.getElementsByClassName('btn btn-default icon-book knowledge')[0].style.visibility = 'hidden';
	
   }
    
} 
