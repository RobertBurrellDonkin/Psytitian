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
dojo.provide("psytitian.widget.Thing");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.widget.BibliographicResource");
dojo.require("psytitian.widget.Agent");
dojo.require("psytitian.widget.TagEditor");
dojo.require("psytitian.widget.Concept");
dojo.require("psytitian.widget.Annotation");

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
			dojo.query(this.containerNode).addClass('psyThing').removeClass('psyHidden');
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
			this.annotationEditor.attr('data', value);
			this.data = value;
		} else {
			dojo.query(this.containerNode).removeClass('psyThing').addClass('psyHidden');
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