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
		return url;
	},
	
	// summary: Data attribute holds JSON representation of the Thing
	data: {},
	
	_setDataAttr: function(value) {
		dojo.query(this.base).empty();
		if (value && value.title) {
			dojo.query(this.containerNode).addClass('psyThing');
			dojo.create("h1", { innerHTML: value.title }, this.base);
			if (value.created) {
				dojo.create("p", {innerHTML: "Loaded on " + value.created}, this.base);
			}
			  
			this.biblio.attr('data', value);
			this.agent.attr('data', value);
			this.data = value;
		} else {
			dojo.query(this.containerNode).removeClass('psyThing');
		}
	},
	
	_getDataAttr: function(value) {
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