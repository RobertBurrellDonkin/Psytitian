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