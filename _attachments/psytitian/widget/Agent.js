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
dojo.provide("psytitian.widget.Agent");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.psytitian");

dojo.declare("psytitian.widget.Agent",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/Agent.html"),
    
    
    data: {},
	
	_setDataAttr: function(value) {
    	console.log(value);
    	dojo.query(this.introNode).empty();
		if (value.types && value.types.indexOf(DC_AGENT) != -1) {
			var agentType = 'Organisation';
			if (value.types.indexOf(FOAF_PERSON) != -1) {
				agentType = 'Personal Information';
			} else if (value.types.indexOf(FOAF_GROUP) != -1) {
				agentType = 'Group Information';
			} 
    		dojo.create("h2", { innerHTML: agentType }, this.introNode);
    		
    		var listNode = dojo.create('dl', {}, this.introNode);
            
    		if (value.homepage) {
            	dojo.create("dt", { innerHTML: "Homepage"}, listNode);
        		dojo.create("a", {href: value.homepage, innerHTML: value.homepage}, dojo.create("dd", {}, listNode));
            }
            if (value.mbox) {
            	dojo.create("dt", { innerHTML: "Email"}, listNode);
        		dojo.create("a", {href: value.mbox, innerHTML: value.mbox.substr(7)}, dojo.create("dd", {}, listNode));
            }
            if (value.weblog) {
            	dojo.create("dt", { innerHTML: "Blog"}, listNode);
            	dojo.create("a", {href: value.weblog, innerHTML: value.weblog}, dojo.create("dd", {}, listNode));
            }
		}
		this.data = value;
	},
	
	_getDataAttr: function(value) {
		return this.data;
	}
});