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
dojo.provide("psytitian.widget.Concept");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
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
			        
			        console.log("Testing iscategory");
			        console.log(values.iscategory);
			        console.log("Done test");
			        
			        if (values.iscategory == 'checked') {
			        	values.types = [SKOS_CONCEPT, ATOM_CATEGORY];
			        } else {
			        	values.types = [SKOS_CONCEPT];
			        }
			        delete values['iscategory'];
			        
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