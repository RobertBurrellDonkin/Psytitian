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
dojo.provide("psytitian.widget.Annotation");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.Textarea");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("psytitian.psytitian");


dojo.declare("psytitian.widget.Annotation",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/Annotation.html"),
    widgetsInTemplate:true,
    
    _lastBodyText: null,
    
    href:null,
    _setHrefAttr: function(href) {
		this._reportError("");
    	this.href = href;
    	dojo.query(this.references).empty();
    	this._reloadReferences();
    },
    
    data:{},
    _setDataAttr: function(value) {
    	if (psy.isAnnotation(value)) {
    		dojo.query(this.details).removeClass('psyHidden');
    		this.author.innerHTML = value.author;
    		this.modified.innerHTML = value.modified;
    		for (type in value.types) {
    			for (item in psy.annotationTypes.items) {
    				if (value.types[type] == psy.annotationTypes.items[item].url) {
    					this.type.innerHTML = psy.annotationTypes.items[item].name;
    				}
    			}
    		}
    		
    		// Use body value to search attachments
    		// More generally should check for URL
    		if (value.body) {
    			dojo.query(this.notes).empty();
    			for (key in value._attachments) {
    				if (value.body == key) {
    					if (value._attachments[key].content_type && value._attachments[key].content_type.slice(0, 10) == "text/plain") {
    						dojo.xhrGet({
    							url: psy.attachment(value._id, value.body),
    							load: dojo.hitch(this, function(data, ioargs) {
    								this.notes.innerHTML = data;
    							}),
    							handleAs: "text",
    							error: function(error, ioargs) {
    								console.warn(error);
    							}
    						});
    					} else {
    						dojo.create('a', {href: psy.attachment(value._id, value.body), innerHTML: value.body}, 
    								this.notes);
    					}
    				}
    			}
    		};
    	} else {
    		dojo.query(this.details).addClass('psyHidden');
    	}
    },
    
    _reloadReferences: function() {
    	if (this.href) {
	    	dojo.xhrGet({
	    		handleAs: 'json',
	    		url: psy.view('annotation'),
	    		content: {key: dojo.toJson(this.href)},
	    		load: dojo.hitch(this, this._loadAnnotations),
	    		error: dojo.hitch(this, this._reportError)
	    	});
    	}
    },
    
    _loadAnnotations: function(json) {
    	dojo.query(this.references).empty();
		dojo.query(
				dojo.create('img',
						{src: dojo.moduleUrl('psytitian', 'resources/images/blank.png').toString()} , 
						this.references))
					.addClass("psyEditAdd").onclick(dojo.hitch(this, this._addNewAnnotation));
    	for(row in json.rows) {
    		dojo.query(dojo.create("a", {href: psy.home(json.rows[row].id), innerHTML: json.rows[row].value}, this.references))
    			.addClass("psyTag");
    	}
    },
    
    _addNewAnnotation: function() {
    	this.showNewDialog();
    },
    
    _reportError: function(error) {
    	this.errorNode.innerHTML = error;
    },
    
    showNewDialog: function() {
		if (!this._openDialog) {
			this._openDialog = new dijit.Dialog({title: "Add New Annotation"});
			this._openDialog.attr('content', this.newFormNode);
			this.newFormNode.onSubmit = dojo.hitch(this, this._onDialogSubmit);
			this.newFormNode.onReset = dojo.hitch(this, this._onDialogReset);
			this.annotationType.attr('store', new dojo.data.ItemFileReadStore({data:psy.annotationTypes}));
		}
		this._reportDialogError("");
		this._openDialog.reset();
		this._openDialog.show();
	},

	_onDialogSubmit: function(event) {
		if (this.newFormNode.isValid()) {
	        var values = this.newFormNode.attr('value');
	        values.name = values.title; // foaf:name
	        values.types= [ANNOTEA_ANNOTATION, values.annotationType];
	        delete values.annotationType;
	        if (values.body) {
	        	this._lastBodyText = values.body
	        	values.body = "body"; // Should be a relative URL but not sure can be done until the ID is known
	        } else {
	        	delete values.body;
	        	this._lastBodyText = null;
	        }
	        values.annotates = this.href;
	        values.created = psy.formatDate(new Date()); // an:created
	        values.modified = values.created; // an:modified
	        values.author = psy.user; // an:author
	        var args = dojo.toJson(values,true);
	        console.log(args);
	        try {
	        psy.post({
	            load: dojo.hitch(this, this._onNewAnnotation),
	            errorDocumentExists: dojo.hitch(this, function(error, ioargs) {
	            	this._onDialogError("That name is already used.", ioargs);
	            }),
	            errorOther: dojo.hitch(this, this._onDialogError)
	        }, 
	        args);
	        } catch (e) {
	        	console.log(e);
	        }
		}
		return false;
	},

	hideDialog: function() {
		if (this._openDialog) {
			this._openDialog.hide();
		}
	},
	
	_onNewAnnotation: function(data, ioargs) {
		if (this._lastBodyText) {
	        try {
		        psy.put({
		            id: data.id,
		            rev: data.rev,
		            attachment: "body",
		        	headers: {"Content-Type": "text/plain"}
		        }, 
		        this._lastBodyText);
		        } catch (e) {
		        	console.log(e);
		        }
		}
		this._onDialogSave(data, ioargs);
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
		this._reloadReferences();
	}
});