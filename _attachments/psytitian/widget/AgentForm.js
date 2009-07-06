 /*   
  * Copyright [2009] Robert Burrell Donkin http://robertburrelldonkin.name
  * 
  *  Licensed under the Apache License, Version 2.0 (the "License");
  *  you may not use this file except in compliance with the License.
  *  You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  *  Unless required by applicable law or agreed to in writing, software
  *  distributed under the License is distributed on an "AS IS" BASIS,
  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  *  See the License for the specific language governing permissions and
  * limitations under the License. 
  */
dojo.provide("psytitian.widget.AgentForm");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.FilteringSelect");
dojo.require("psytitian.agent");
dojo.require("dojox.validate.regexp");
dojo.require("dijit.form.ValidationTextBox");

dojo.declare("psytitian.widget.AgentForm",
[dijit._Widget, dijit._Templated, dijit.form.Form], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/AgentForm.html"),
    widgetsInTemplate:true,
    
	onSubmit:function(e) {
		this.save();
		return false;
	},
	
	onReset:function(e) {
		this.reportError('');
		this.postReset();
		return false;
	},

	save:function() {
        var values = this.attr('value');
        values._id = values.title;
        values.name = values.title; // foaf:name
        values.types = psy.agent.type.base;
        if(values.agencyType) {
        	if (values.agencyType == 'Organization') {
        		values.types = psy.agent.type.org;
        	} else if (values.agencyType == 'Group') {
        		values.types = psy.agent.type.group;
        	} else if (values.agencyType == 'Person') {
        		values.types = psy.agent.type.person;
        	}
        	delete values['agencyType'];
        }
        
        var args = dojo.toJson(values,true);
        console.log("Saving " + args);
        
        psy.put({
            id: values._id,
            load: this.onSave,
            errorDocumentExists: function(error, ioargs) {
        		this._widget._onError("That name is already used.", ioargs);
        	},
            errorOther: function(error, ioargs) {
        		this._widget._onError(error, ioargs);
        	},
            _widget: this
        }, 
        args);
	},
	
	onSave:function(data, ioargs) {
		// summary: hook after successful save
		console.log("Saved", data);
	},
	
	_onError:function(error, ioargs) {
		this.onError(error, ioargs);
	},
		
	onError:function(error, ioargs) {
		// summary: hook after unsuccessful save
		console.log(ioargs);
		console.warn(error);
		this.reportError(error);
	},
	
	reportError: function(error) {
		var errorNodes = dojo.query(".error", this.containerNode);
		errorNodes.forEach(function (node) {
			node.innerHTML = error;
		});
	},
	
	postReset:function() {
		// summary: hook after reset complete
		console.log("Post reset");
	}
});