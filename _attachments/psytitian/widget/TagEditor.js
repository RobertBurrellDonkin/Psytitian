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
dojo.provide("psytitian.widget.TagEditor");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.store");
dojo.require("dijit.form.FilteringSelect");

dojo.declare("psytitian.widget.TagEditor",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/TagEditor.html"),
    
    
//Properties
    // Value collects the tags
    _tags: [],
    _getValueAttr: function() {
		this._tags = [];
		var tagNodes = dojo.query('.psyTag', this.containerNode);
		if (tagNodes) {
			tagNodes.forEach(function(node) {
				this._tags.push(node.innerHTML);
			}, this);
		}
    	return this._tags;
    },
    
    _setValueAttr: function(value) {
    	dojo.query(this.tagsContainerNode).empty();
    	dojo.forEach(value, this._add, this);
    },

    // URL for selection JSON 
    // Optional
    url: "",
    _setUrlAttr: function(url) {
    	if (this._selectionWidget) {
    		psy.store.forUrl(this.url).remove(this._selectionWidget);
    	}
    	this.url = url;
    	this._rebuildSelection();    	
    },

    // Controls whether this editor is just a view
    readOnly: false,
    
    _setReadOnlyAttr: function(readOnly) {
    	this.readOnly = readOnly;
    	if (readOnly) {
    		dojo.query(this.containerNode).addClass('psyReadOnly');
    	} else {
    		dojo.query(this.containerNode).removeClass('psyReadOnly');
    	}
    	this._rebuildSelection();
    	this._rebuildEditBar();
    	this.attr('value', this.attr('value'));
    },
    
    // The base URL for tag home pages
    baseUrl: "",
    _setBaseUrlAttr: function(value) {
    	this.baseUrl = value;
    },
    _getBaseUrlAttr: function() {
    	return this.baseUrl;
    },
    
    // The edit bar allow the user to initiate and control editing
    editBar: false,
    _setEditBarAttr: function(value) {
    	if (value) {
    		this.editBar = true;
    	} else {
    		this.editBar = false;
    	}
    	this._rebuildEditBar();
    },
    
// Methods
    isEditing: false,

    abortEditing: function() {
    	this.isEditing = false;
    	this.attr('value', this._preEditValue);
    	delete this._preEditValue;
    	this._setReadOnlyAttr(true);
    },
    startEditing: function() {
    	try {
    		this.isEditing = true;
	    	this._setReadOnlyAttr(false);
	    	this._preEditValue = this.attr('value');
    	} catch (e) {
    		console.warn(e);
    	}
    },
    _rebuildEditBar: function() {
    	// summary: rebuilds edit bar after changes to settings
    	if (this.editBar) {
    		dojo.query(this.editBarNode).empty();
    		if (this.isEditing) {
    			if (this.addNew) {
    				this._addEditBarImage('psyEditAdd', this.addNew);
    			}
    			if (this.save) {
    				this._addEditBarImage('psyEditOk', this.save);
    			}
        	    this._addEditBarImage('psyEditAbort', dojo.hitch(this, this.abortEditing));
    		} else {
    			this._addEditBarImage('psyEditStart', dojo.hitch(this, this.startEditing));
    		}
    	} else {
    		dojo.query(this.editBarNode).empty();
    	}
    },
    _rebuildSelection: function() {
    	// summary: rebuilds selection widget after changes to settings
    	// Remove existing
    	if (this.readOnly) {
    		if (this._selectionWidget) {
    			this._selectionWidget.attr('readOnly', true);
    		}
    	} else {
	    	if (this._selectionWidget) {
	    		this._selectionWidget.attr('readOnly', false);
	    	} else if (this.url) {
		    	this._selectionWidget = new dijit.form.FilteringSelect({
		    		searchAttr: "value",
		    	    onChange: dojo.hitch(this, this.add)
		    	}, this.storeContainerNode);
		    	psy.store.forUrl(this.url).add(this._selectionWidget).load();
	    	}
    	}
    },
    
    _addEditBarImage: function(type, onclick) {
		dojo.query(
				dojo.create('img',
						{src: dojo.moduleUrl('psytitian', 'resources/images/blank.png').toString()} , 
						this.editBarNode))
					.addClass(type).onclick(onclick);
    },
    
    _add: function(value) {
    	if (value) {
    		var node;
    		if (this.baseUrl && this.readOnly) {
    			node = dojo.create("a", {href: this.baseUrl + value, innerHTML: value}, this.tagsContainerNode);
    		} else {
    			node = dojo.create("span", {innerHTML: value}, this.tagsContainerNode);
    		}
			dojo.query(node)
			.addClass('psyTag').onclick(function(e) {
				dojo.query(this).toggleClass('psyTagGhost').toggleClass('psyTag');
			});
	    }
    },
    reset: function() {
    	this.attr('value', []);
    },
    
    add: function(value) {
    	var existingTags = this.attr('value');
    	for(i in existingTags) {
    		if (existingTags[i] == value) {
    			var valueAlreadyIncluded = true;
    		}
    	}
    	
    	if (!valueAlreadyIncluded) {
    		var nodes = dojo.query('.psyTagGhost', this.containerNode);
    		for (i in nodes) {
    			if (nodes[i].innerHTML == value) {
    				var valueAlreadyIncluded = true;
    				dojo.query(nodes[i]).toggleClass('psyTagGhost').toggleClass('psyTag');
    			}
    		}
    	}
    	
    	if (!valueAlreadyIncluded) {
    		this._add(value);
    	}
    }
});