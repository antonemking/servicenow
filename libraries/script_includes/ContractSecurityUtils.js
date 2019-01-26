/*
** Secure Contract records based on an assigned business units(BUs). Groups are then assoicated to BUs. If user is in a
** group attached ta a BU and that BU is assigned to a contract give read access. Child BUs will flow up to 4 layers for
** users in a Global BU.
**
** Set read ACL to:
** var bu = current.u_contract_team;
** var userId = gs.getUserID();
** var csu = new ContractSecurityUtils(userId, bu);
** answer = csu.canRead();
*/

var ContractSecurityUtils = Class.create();
ContractSecurityUtils.prototype = {
    initialize: function(user, bu) {
		this.reader  = 'contract_requestors';
		this.manager = 'contract_creator';
		this.admin   = 'contract_admin';
		this.user    = user;
		this.bu      = bu;
    },
	
	canRead : function(){
		var role = this.reader;
		var groupsInBu = this._groupBuAssociations(this.bu); // store string list of groups connected to the bu
		var userInBuGroup = this._hasGroupsExactly(groupsInBu); // return true if user is in a group connected to the BU
		gs.log('[READ ACCESS] canRead() userInBuGroup ' + userInBuGroup );
		if(this._hasRoleExactly(role)){
			if(userInBuGroup){
				gs.log('[READ ACCESS] Groups are connected to this BU');
				return true;
			} else {
				
				var parentId = this._hasParent(this.bu);
				var groupsInParentBu = this._groupBuAssociations(parentId);
				var userInParentBu = this._hasGroupsExactly(groupsInParentBu);
				gs.log('[READ ACCESS] canRead() userInParentBu ' + userInParentBu );
				if(userInParentBu){
					gs.log('[READ ACCESS] BU does not have a groups associated but Parent Does');
					return true;
				} else {
					
					var topLvlParentId = this._hasTopLvlParent(this.bu);
					var groupsInTopLvlParentBu = this._groupBuAssociations(topLvlParentId);
					var userInTopLvlParentBu = this._hasGroupsExactly(groupsInTopLvlParentBu);
					gs.log('[READ ACCESS] canRead() topLvlParentId ' + topLvlParentId );
					if(userInTopLvlParentBu){
						gs.log('[READ ACCESS] BU does not have any groups associated but Top Level Parent Does');
						return true;
					}
				}
			}
		}
		return false;	
	},
	
	canCreate : function(){
		var role = this.manager;
		if(this._hasRoleExactly(role) && this.canRead()){
			return true;
		}
		return false;
	},
	
	canWrite : function(){
		var role = this.manager;
		if(this.canDelete() || this._accessRecurse(role) || this.bu == ''){
			return true;
		}
		return false;
		
	},
	
	canDelete : function(){
		var role = this.admin;
		return this._accessRecurse(role);
	},
			
	// Is Global BU
	isGlobal : function(){
		var grObject = this._buGR(this.bu);
		var result = false;
		if(grObject.next()){
			if(grObject.getDisplayValue('u_top_level_parent') === '' && grObject.getDisplayValue('u_location') === 'Global'){
				result = true;
			}
		}
		return result;		
	},
	
	// BU has no top level parent
	isRegion : function(){
		var result = false;
		var grObject = this._buGR(this.bu, false, false);
		if(grObject.next()){
			if((grObject.getDisplayValue('u_top_level_parent') === '' && grObject.getDisplayValue('parent') !== '')){
				result = true;
			}
		}
		return result;
	},
	
	// BU has a parent and top level parent
	isSubRegion : function(){
		var result = false;
		var grObject = this._buGR(this.bu);
		if(grObject.next()){
			if(!this.isRegion(this.bu) && !this.isGlobal(this.bu)){
				result = true;
			}
		}
		return result;
	},
	
	_accessRecurse : function(role){
		var groupsInBu = this._groupBuAssociations(this.bu);
		var userHasGroup = this._userHasGroup(groupsInBu);
		if (this._groupHasRole(userHasGroup).indexOf(role) > -1){
			return true;
		} else {
			var parentId = this._hasParent(this.bu);
			var groupsInParentBu = this._groupBuAssociations(parentId);
			var userHasGroupParent = this._userHasGroup(groupsInParentBu);
			if(this._groupHasRole(userHasGroupParent).indexOf(role) > -1){
				return true;
			} else {
				var topLvlParentId = this._hasTopLvlParent(this.bu);
				var groupsInTopLvlParentBu = this._groupBuAssociations(topLvlParentId);
				var userHasGroupTop = this._userHasGroup(groupsInTopLvlParentBu);
				if(this._groupHasRole(userHasGroupTop).indexOf(role) > -1){
					return true;
				}
			}
			return false;
		}
		
	},
	
	// BU GlidRecord Object
	_buGR : function(bu){
		var gr = new GlideRecord('business_unit');
		gr.addQuery('sys_id', bu);
		gr.addQuery('u_active', 'true');
		gr.query();									   
		return gr;
	},
	
	// Group BU associations
	_groupBuAssociations : function(bu){
		var buStr;
		var grObject = this._buGR(bu);
		if(grObject.next()){
			buStr = grObject.getValue('u_groups') + '';
		}
		if(buStr){
			gs.log('[READ ACCESS] BU Association ' + buStr);
			return buStr;
		} else {
			return '';
		}
		
		
	},
	
	_hasRoleExactly : function(role){
		var rol = new GlideRecord('sys_user_role');
		rol.addQuery('name', role);
		rol.query();
		if (rol.next()) {
			var hasRole = new GlideRecord('sys_user_has_role');
			hasRole.addQuery('user', this.user);
			hasRole.addQuery('role', rol.sys_id);
			hasRole.query();
			if (hasRole.next()) {
				return true;
			} else {
				return false;
			}
		}
		return false;		
	},
	
	_userHasGroup : function(groups){
		gs.log('Groups being passed to _userHasGroup func ' + groups);
		var arr;
		var hasGroup = new GlideRecord('sys_user_grmember');
		hasGroup.addQuery('user', this.user);
		hasGroup.addQuery('group', 'IN', groups);
		hasGroup.query();
		if (hasGroup.next()) {
			//arr.push(hasGroup.group + '');
			arr = hasGroup.group.toString();
		}
		//gs.log('====> '+ this.user + ' User has the following Group ' + arr);
		return arr;
		
	},
	
	_hasGroupsExactly : function(groups){
		gs.log('Groups passed to _hasGroupsExactly func ' + groups);
		var hasGroup = new GlideRecord('sys_user_grmember');
		hasGroup.addQuery('user', this.user);
		hasGroup.addQuery('group', 'IN', groups);
		hasGroup.query();
		if (hasGroup.next()) {
			gs.log('[READ ACCESS] true');
			return true;
		} else {
			//gs.log('[READ ACCESS] ' + this.user + ' User does not have any groups associated with a BU');
			return false;
		}
		
	},
	
	_groupHasRole : function(groups){
		var roles = [];
		var groupRole = new GlideRecord('sys_group_has_role');
		groupRole.addQuery('group', 'IN', groups);
		groupRole.query();
		while(groupRole.next()){
			roles.push(groupRole.getDisplayValue('role') + '');
		}
		//gs.log('====> ' + groups + ' has roles ' + roles);
		return roles;
	},
	
	_hasParent : function(parentBu){
		gs.log(' BU has a parent and child passed to it was ' + parentBu);
		var gr = new GlideRecord('business_unit');
		//var parentGr = gr.addQuery('sys_id', parentBu);
		//parentGr.addOrCondition('parent', parentBu);
		gr.addQuery('sys_id', parentBu);
		gr.query();
		if(gr.next()){
			gs.log('[READ ACCCESS] + _hasParent ' + gr.parent);
			return gr.getValue('parent');
		}	
	},
	_hasTopLvlParent : function(topLvlParentBu){
		gs.log('[READ ACCESS] _hasTopLvlParent func value ' + topLvlParentBu);
		var buId;
		var groupAssociations;
		var layer4 = false;
		var gr = new GlideRecord('business_unit');
		//var parentGr = gr.addQuery('sys_id', topLvlParentBu);
		//parentGr.addOrCondition('u_top_level_parent', topLvlParentBu);
		gr.addQuery('sys_id', topLvlParentBu);
		gr.addNotNullQuery('u_top_level_parent');
		gr.query();
		if(gr.next()){
			buId = gr.getValue('u_top_level_parent') + '';
			if(buId){
				groupAssociations = this._groupBuAssociations(buId);			
				if(groupAssociations == 'null'){
					layer4 = true;
					
				}
			}			
		}
		if(layer4){
			buId = this._hasParent(buId);
			//gs.log('[READ ACCESS] 4th layer ' + topLvlParentBu + ' returing parent of top level BU ' + buId);
			return buId;
		}else {
			//gs.log("[READ ACCESS] 3rd Layer " + buId + " groups type " + groupAssociations);
			return buId;
		}
		
	},
	
	

    type: 'ContractSecurityUtils'
};
