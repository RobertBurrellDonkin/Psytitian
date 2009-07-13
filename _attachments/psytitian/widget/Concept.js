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
dojo.provide("psytitian.widget.Concept");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.Button");

dojo.declare("psytitian.widget.Concept",
		[dijit._Widget, dijit._Templated], {
		    templateString:null,
		    templatePath: dojo.moduleUrl("psytitian", "widget/Concept.html"),
		    widgetsInTemplate:true,
		    
		    showNewDialog: function() {
				this._openDialog = new dijit.Dialog({title: "Add New Concept"});
				this._openDialog.attr('content', this.newFormNode);
				this.newFormNode.onSubmit = dojo.hitch(this, this._onDialogSubmit);
				this.newFormNode.onReset = dojo.hitch(this, this._onDialogReset);
				this._openDialog.show();
			},

			_onDialogSubmit: function(event) {
				console.log("Submit");
				console.log(this);
				console.log(event);
				this._openDialog.hide();
				return false;
			},
			
			_onDialogReset: function(event) {
				console.log("Reset");
				console.log(this);
				console.log(event);
				return true;
			}
});