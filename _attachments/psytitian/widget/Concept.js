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
dojo.require("psytitian.psytitian");

dojo.declare("psytitian.widget.Concept",
		[dijit._Widget, dijit._Templated], {
		    templateString:null,
		    templatePath: dojo.moduleUrl("psytitian", "widget/Concept.html"),
		    widgetsInTemplate:true,
		    
		    showNewDialog: function() {
				if (!this._openDialog) {
					this._openDialog = new dijit.Dialog({title: "Add New Concept"});
					this._openDialog.attr('content', this.newFormNode);
					this.newFormNode.onSubmit = dojo.hitch(this, this._onDialogSubmit);
					this.newFormNode.onReset = dojo.hitch(this, this._onDialogReset);
				}
				this._reportDialogError("");
				this._openDialog.reset();
				this._openDialog.show();
			},

			_onDialogSubmit: function(event) {
				if (this.newFormNode.isValid()) {
			        var values = this.newFormNode.attr('value');
			        values._id = values.title;
			        values.name = values.title; // foaf:name
			        values.types= [SKOS_CONCEPT];
			        
			        var args = dojo.toJson(values,true);
			        console.log("Saving " + args);
			        psy.put({
			            id: values._id,
			            load: dojo.hitch(this, this._onDialogSave),
			            errorDocumentExists: dojo.hitch(this, function(error, ioargs) {
			            	this._onDialogError("That name is already used.", ioargs);
			            }),
			            errorOther: dojo.hitch(this, this._onDialogError)
			        }, 
			        args);
				}
				return false;
			},

			hideDialog: function() {
				if (this._openDialog) {
					this._openDialog.hide();
				}
			},
			_onDialogSave: function(data, ioargs) {
				this.hideDialog();
				this.onSave(data, ioargs);
			},
			_onDialogError: function(error, ioargs) {
				console.log(ioargs);
				console.log(error);
				this._reportDialogError(error);
			},
			
			_reportDialogError: function(error) {
				this.newFormErrorNode.innerHTML = error;
			},
			
			_onDialogReset: function(event) {
				this.hideDialog();
				return true;
			},
			
			onSave: function(data, ioargs) {
				// summary: hook called after successful save
				console.log(data);
				console.log(ioargs);
				console.log("This is the 'onSave' empty hook");
			}
});