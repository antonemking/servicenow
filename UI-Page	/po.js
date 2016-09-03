<?xml version="1.0" encoding="utf-8"?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">	
	 			
	<!-- Get values from dialog preferences passed in -->
	<j:set var="jvar_sysid" value="${RP.getWindowProperties().get('sysparm_sysId')}" /> 
	<j:set var="jvar_table_name" value="${RP.getWindowProperties().get('sysparm_tableName')}" />
	<j:set var="jvar_target_table" value="${RP.getWindowProperties().get('sysparm_targetTable')}" />
	<j:set var="jvar_target_id" value="${RP.getWindowProperties().get('sysparm_targetId')}" />  

	<input type="hidden" id="task_sys_id" name="task_sys_id" value="${sysparm_sysId}"/>
	<input type="hidden" id="task_table" name="task_table" value="${sysparm_tableName}"/>	
	<input type="hidden" id="target_table" name="target_table" value="${sysparm_targetTable}"/>	
	<input type="hidden" id="target_Id" name="target_Id" value="${sysparm_targetId}"/>
	<span id="content_id" name="content_name">
		<link href="6ff6fad84fec224091be495d0210c765.cssdbx" rel="stylesheet" type="text/css"></link>
		<table class="logos">
			<g2:evaluate var="jvar_instance">
				var instance = gs.getProperty("glide.servlet.uri");
				instance +="/";
				var bayviewLogo = instance + "BayviewLogo.png"
				var bvFinancial = instance + "bayview_financial.png"
				var signature = instance + "sw_signature.png";
			</g2:evaluate>
			<tbody>
				<tr>	
					<td class="superCentered"><img width="150" height="56" src="$[bayviewLogo]" alt=""/> </td>
					<td class="header"> PURCHASE ORDER</td>		
					<td class="superCentered"> <img width="162" height="69" src="$[bvFinancial]" alt=""/></td>
				</tr>	
			</tbody>	
		</table>
		<table  class="logos">	
			<g2:evaluate var="jvar_po_item">
				var item = new GlideRecord("proc_po_item");
				item.addQuery("purchase_order", "${jvar_sysid}");
				item.orderBy("number");
				item.query();				
				item;				
				var po = new GlideRecord("${jvar_table_name}");
				po.get("${jvar_sysid}");
				var po_date = new GlideDateTime(po.po_date);
				var po_date_form = po_date.getDate();	
				var due_date = new GlideDateTime(po.due_by);
				var due_date_form = due_date.getDate();
				var currDate = new GlideDate();
				var total = new GlideAggregate("proc_po_item");
				total.addQuery("purchase_order", "${jvar_sysid}");			
				total.addAggregate("SUM","total_cost");
				total.groupBy("purchase_order");
				total.query();
				var subTotal = 0;
				while (total.next()){
					subTotal = total.getAggregate("SUM","total_cost");
				}

				var jvar_i = -1;
			 </g2:evaluate>
			<tbody>
				<tr>	
					<th><b>PURCHASE ORDER:</b> $[po.number]</th>	
					<th><b>PURCHASE ORDER DATE:</b> $[po_date_form]</th>		
					<th><b>DATE REQUIRED:</b> $[due_date_form] </th>					
				</tr>
				<tr>	
					<th><b>SHIP TO:</b><br/>$[po.ship_to.name] <br/> $[po.ship_to.location.street] <br/> $[po.ship_to.location.city], $[po.ship_to.location.state] $[po.ship_to.location.zip]</th>	
					<th><b>BILL TO:</b><br/>$[po.bill_to.name] <br/> $[po.bill_to.street] <br/> $[po.bill_to.city], $[po.bill_to.state] $[po.bill_to.zip]</th>		
					<th><b>VENDOR:</b><br/>$[po.vendor.name] <br/> $[po.vendor.street] <br/>$[po.vendor.city], $[po.vendor.state] $[po.vendor.zip] <br/></th>
				</tr>
				<tr>	
					<th><b>TERMS:</b> $[po.terms.getDisplayValue()]</th>
					<th><b>SHIPPING:</b> $[po.shipping.getDisplayValue()]</th>		
					<th><b>REQUESTOR:</b> $[po.requested_by.name]</th>
				</tr>
			</tbody>
		</table>	

		<table class="fields">
			<tbody>
				<tr>	
					<th class= "hundred"><b>ITEM NO.</b></th>
					<th class= "description"><b>DESCRIPTION</b></th>		
					<th class= "thirty"><b>QTY</b></th>
					<th class= "hundred"><b>CAT CODE</b></th>
					<th class= "hundred"><b>DEPT CODE</b></th>		
					<th class= "hundred"><b>UNIT COST</b></th>
					<th class= "hundred"><b>TOTAL</b></th>		
				</tr>	
			</tbody>
		</table>
	
		<table class="fields">
			<tbody>
			<g2:evaluate var="jvar_i" expression="jvar_i = -1;" />
				<j2:while test="$[item.next()]">
					<g2:evaluate var="jvar_po_line_item">
						var po_obj = new PurchaseOrder();
						var cat_code = po_obj.getModelCatName(item.model.cmdb_model_category);
					</g2:evaluate>
					<tr class="$[rowClass] item" id="row_$[jvar_i]">
						<td class= "hundred">$[item.part_number]</td>
						<td class= "description">$[item.model.display_name]</td>
						<td class= "thirty">$[item.ordered_quantity]</td>
						<td class= "hundred">$[cat_code]</td>
						<td class= "hundred">$[item.request_line.request.requested_for.department.id]</td>
						<td class= "hundred">$[item.cost]</td>
						<td class= "hundred">$[item.total_cost]</td>
					</tr>

				</j2:while>
			</tbody>
		</table>

		
			
		<table class="floatedTable">	
			<tbody>
				<tr>
					<td class="floated" rowspan="4"><u> <img width="250" height="68" src="$[signature]" alt=""/></u></td>						
					<td class="floated" rowspan="4" >
						<span style="display-inline;"> Date: <u>$[currDate]</u></span>
					
					</td>
					<td class="inline" >SUB-TOTAL</td>
					<td class="inline" >$[subTotal]</td>
				</tr>	
				<tr>
					<td class="inline" >SHIPPING</td>
					<td class="inline" >$[po.ship_rate]</td>		
				</tr>
				<tr>
					<td class="inline">TAX</td>
					<td class="inline"><u>$0.00</u></td>	
				</tr>
				<tr>
					<td class="inline">TOTAL</td>
					<td class="inline">$[po.total_cost]</td>
				</tr>
			</tbody>
		</table>	
			
	</span>
</j:jelly>