//Report on articles a user has not rated. Tied to Crowd voting application - aking

var FeedbackUtils = Class.create();
FeedbackUtils.prototype = {
	initialize: function() {
		
		
	},
	
	processData : function(user_id){
		var hasRated = this._hasRated();
		var arr = [];
		var kb = new GlideRecord('kb_knowledge');
		kb.query();
		while(kb.next()){
			arr.push(kb.sys_id.toString());
		}
		var gr = new GlideRecord('u_unrated_articles_x');
		gr.initialize();
		var usr = new GlideRecord('sys_user');
		//usr.addEncodeQuery('active=true^nameSTARTSWITHa');
		//usr.addQuery('sys_id','6816f79cc0a8016401c5a33be04be441'); //admin testing
		usr.addQuery('sys_id','IN', hasRated.join(','));
		usr.query();
		while(usr.next()){
			for (var i = 0; i < arr.length; i++){
				if(this._kbFeedback(arr[i], usr.sys_id)){
					this._updateUnrated();
				} 
				else if(this._checkUnrated(arr[i], usr.sys_id)) {
				}
				else {
					//gs.log('no match article must not have been rated by this person');
					gr.u_user = usr.sys_id;
					gr.u_unrated = 'true';
					gr.u_article = arr[i];
					gr.insert();
				}
			}
			
		}
	},
	
	_checkUnrated : function(article, user){
		var value = false;
		var gr = new GlideRecord('u_unrated_articles_x');
		gr.query();
		while(gr.next()){
			if(article == gr.u_article && gr.u_user == user){
				value = true;
			}
		}
		return value;
	},
	
	_updateUnrated: function(article, user){
		var unrated = new GlideRecord('u_unrated_articles_x');
		unrated.query();
		while(unrated.next()){
			if(this._kbFeedback(unrated.u_article, unrated.u_user)){
				gs.log('DELETE ' + unrated.u_article.number);
				unrated.deleteRecord();
			}
		}	
	},
	
	_kbFeedback : function(article, user){
		var obj = this._userFeed();
		var data;
		var value = false;
		for (var i = 0; i < obj.length; i++){
			data = obj[i];
			if(data.user == user && article == data.article){
				value = true;
			}
		}
		return value;
		
	},
	
	_userFeed : function(){
		var arr = [];
		var articles = [];
		var gr = new GlideRecord('sys_user');
		gr.addActiveQuery();
		gr.query();
		while(gr.next()){
			arr.push(gr.sys_id.toString());
		}
		var feedback = new GlideRecord('kb_feedback');
		feedback.addQuery('user', 'IN', arr.join(','));
		feedback.query();
		while(feedback.next()){
			var articleObj = {};
				if(feedback.article.short_description != ''){
					articleObj.article = feedback.article.toString();
					articleObj.user = feedback.user.toString();
					articles.push(articleObj);
				}
			}
			return articles;	
		},
	
	_hasRated : function(){
		var arr =[];
		var arrayUtil = new ArrayUtil();
		var feedback = new GlideRecord('kb_feedback');
		feedback.query();
		while(feedback.next()){
			arr.push(feedback.user.toString());
		}
		return arrayUtil.unique(arr);
	},
		
		
		type: 'KbUtils'
	};
