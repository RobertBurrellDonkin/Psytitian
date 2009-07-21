 /*   
  * Copyright [2009] Robert Burrell Donkin http://robertburrelldonkin.name
  * 
  *  This file is part of Psytitian.
  *
  *  Psytitian is free software: you can redistribute it and/or modify
  *  it under the terms of the GNU General Public License as published by
  *  the Free Software Foundation, either version 3 of the License, or
  *  (at your option) any later version.
  *
  *  Psytitian is distributed in the hope that it will be useful,
  *  but WITHOUT ANY WARRANTY; without even the implied warranty of
  *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  *  GNU General Public License for more details.
  *
  *  You should have received a copy of the GNU General Public License
  *  along with Psytitian.  If not, see <http://www.gnu.org/licenses/>.
  */
dojo.provide("psytitian.widget.AgentForm");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
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

	_httpUrl: function(values, name) {
        if (values[name] && values[name].substring(0,7) != 'http://') {
        	values[name] = 'http://' + values[name];
        };
	},
	
	save:function() {
        var values = this.attr('value');
        values._id = values.title;
        values.name = values.title; // foaf:name
        if (values.mbox) {
        	values.mbox = "mailto:" + values.mbox;
        }
        this._httpUrl(values, "weblog");
        this._httpUrl(values, "homepage");
        
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