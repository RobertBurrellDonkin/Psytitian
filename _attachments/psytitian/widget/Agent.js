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
		if (value.types && value.types.indexOf(DC_AGENT) != -1) {
    		dojo.create("h2", { innerHTML: 'Agent Information' }, this.introNode);
		} else {
			dojo.query(this.introNode).empty();
		}
		this.data = value;
	},
	
	_getDataAttr: function(value) {
		return this.data;
	}
});