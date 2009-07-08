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
    _tags: [],
    url: "",
    getValue: function() {
		this._tags = [];
		var tagNodes = dojo.query('.psyTag', this.containerNode);
		if (tagNodes) {
			tagNodes.forEach(function(node) {
				this._tags.push(node.innerHTML);
			}, this);
		}
    	return this._tags;
    },
    
    startup: function() {
    	try {
	    	if (this.url != "") {
	    		this.setUrl(this.url);
	    	}
    	} catch (e) {
    		console.warn(e);
    	}
    },
    
    setValue: function(value) {
    	dojo.query('.psyTag', this.containerNode).empty();
    	dojo.query('.psyTagGhost', this.containerNode).empty();
    	dojo.forEach(value, this._add, this);
    },
    
    add: function(value) {
    	var existingTags = this.getValue();
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
    },
    
    setUrl: function(url) {
    	psy.store.forUrl(url).add(new dijit.form.FilteringSelect({
    		searchAttr: "value",
    	    onChange: dojo.hitch(this, this.add)
    	}, this.storeContainerNode)).load();
    },
    
    _add: function(value) {
    	if (value) {
			dojo.query(dojo.create("span", {innerHTML: value}, this.containerNode))
			.addClass('psyTag').onclick(function(e) {
				dojo.query(this).toggleClass('psyTagGhost').toggleClass('psyTag');
			});
	    }
    },
    reset: function() {
    	this.setValue({});
    }
});