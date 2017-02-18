<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<div class="uptime-graphs-section api-uptime-graph">
	<div class="uptime-graph-header clearfix">
		<span class="uptime-stat-name">RFM 2</span>
	</div>
		<div class="block-chart">
		<div  ng-repeat="record in model.data.records | orderBy: 'from_date'" ng-class="{2:'bar', 3:'bar mid', 4: 'bar down'}[record.system_status]" title="System status from {{record.from_date}} to {{record.to_date}} in {{record.market}} message: {{record.description}}" ng-if="$index >= 0" ng-click="openStatus(record.sys_id)"></div>
		
		</div>

</div>
</j:jelly>