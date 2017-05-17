
try {
var r = new RESTMessage('', 'get');  
var response = r.execute();  
  
  
var jsonString = response.getBody();  
var parser = new JSONParser();  
var parsed = parser.parse(jsonString);  
  
} catch(e){
    gs.log(e.message);
}
for (i = 0; i < parsed.computer_reports.length; i++) {  
    var name = parsed.computer_reports[i].Computer_Name;  
    var make = parsed.computer_reports[i].Make;  
    var model = parsed.computer_reports[i].Model;  
    var number_of_processors = parsed.computer_reports[i].Number_of_Processors;  
    var processor_speed_mhz = parsed.computer_reports[i].Processor_Speed_MHz;  
    var processor_Type = parsed.computer_reports[i].Processor_Type;  
    var serial_number = parsed.computer_reports[i].Serial_Number;  
    var asset_tag = parsed.computer_reports[i].Serial_Number;  
    var total_ram_mb = parsed.computer_reports[i].Total_RAM_MB;  
    var operating_system = parsed.computer_reports[i].Operating_System;  
    var username = parsed.computer_reports[i].Username; 
    var drive_capacity_mb = parsed.computer_reports[i].Drive_Capacity_MB;  
    
  
  
    var rec = new GlideRecord('');  
     rec.initialize();  
            rec.computer_name = name;  
            rec.make = make;  
            rec.model = model;  
            rec.number_of_processors = number_of_processors;  
            rec.processor_speed_mhz = processor_speed_mhz;  
            rec.processor_Type = processor_Type;  
            rec.serial_number = serial_number;  
            rec.asset_tag = asset_tag;  
            rec.total_ram_mb = total_ram_mb;  
            rec.operating_system = operating_system;  
            rec.username = username;  
            //rec.warranty_expiration = warranty_expiration;  
            rec.drive_capacity_mb = drive_capacity_mb;  
     rec.insert();  
  
} 
