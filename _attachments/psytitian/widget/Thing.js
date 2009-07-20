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
dojo.provide("psytitian.widget.Thing");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.widget.BibliographicResource");
dojo.require("psytitian.widget.Agent");
dojo.require("psytitian.widget.TagEditor");
dojo.require("psytitian.widget.Concept");

dojo.declare("psytitian.widget.Thing",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/Thing.html"),
    widgetsInTemplate:true,
    
    // summary: URL from which the JSON representation of Thing can be loaded
    url:"",
    
    _setUrlAttr: function(value) {
		this.url = value;
		this.reload();
	},

	_getUrlAttr: function() {
		return this.url;
	},
	
	// summary: URL from which JSON representations of concepts can be loaded
	conceptUrl:"",
	_setConceptUrlAttr: function(value) {
		this.conceptUrl = value;
		if (value) {
			this.subjectEditor.attr('url', value);
			this.subjectEditor.attr('editBar', true);
			this.subjectEditor.save = dojo.hitch(this, this._saveSubject);
			this.subjectEditor.addNew = dojo.hitch(this, this._addNewConcept);
		}
	},
	
	_saveSubject: function() {
		this.data.subject = this.subjectEditor.attr('value');
		psy.put({
			id: this.data._id,
			load: dojo.hitch(this, this.reload)
		}, dojo.toJson(this.data, true));
		this.subjectEditor.finishEditing();
	},
	
	_addNewConcept: function() {
		this.concept.onSave = dojo.hitch(this, function() {
			this.subjectEditor.reload();
		});
		this.concept.showNewDialog();
	},
	
	// summary: Data attribute holds JSON representation of the Thing
	data: {},
	
	_setDataAttr: function(value) {
		dojo.query(this.base).empty();
		if (value && value.title) {
			dojo.query(this.containerNode).addClass('psyThing');
			dojo.create("h1", { innerHTML: value.title }, this.base);
			if (value.description) {
				dojo.create("p", {innerHTML: value.description}, this.base);
			}
			if (value.created) {
				dojo.create("p", {innerHTML: "Loaded on " + value.created}, this.base);
			}
			  
			this.biblio.attr('data', value);
			this.agent.attr('data', value);
			if (value.subject) {
				this.subjectEditor.attr('value', value.subject);
			}
			this.data = value;
		} else {
			dojo.query(this.containerNode).removeClass('psyThing');
		}
	},
	
	_getDataAttr: function() {
		return this.data;
	},
	
	// summary: base url for home documents
	baseHomeUrl: "",
	_getBaseHomeUrlAttr: function() {
		return this.baseHomeUrl;
	},
	_setBaseHomeUrlAttr: function(value) {
		this.baseHomeUrl = value;
		if (this.biblio) {
			this.biblio.attr('baseHomeUrl', value);
		}
		if (this.subjectEditor) {
			this.subjectEditor.attr('baseUrl', value);
		}
	},
	
	// summary: loads data from url
	reload: function() {
		if (this.url) {
        	dojo.xhrGet({
        	    url: this.url,
        	    handleAs: "json",
                load: dojo.hitch(this, this._load),
                error: dojo.hitch(this, this._error)
        	});
		} else {
			console.log("Set url with JSON load address");
		}
	},
	
	_load: function(data, ioargs) {
		try {
			this._setDataAttr(data);
			this.onLoad(data);
		} catch (e) {
			console.warn(e);
		}
	},
	
	_error: function(error, ioargs) {
		try {
			console.log(error);
			console.log(ioargs);
			this.onError(error, ioargs);
		} catch (e) {
			console.warn(e);
		}
	},
	
	// Override to handle errors
	onError: function(error, ioargs) {
		console.warn(error);
	},
	
	// Hook for overriding
	onLoad: function(data) {}
});