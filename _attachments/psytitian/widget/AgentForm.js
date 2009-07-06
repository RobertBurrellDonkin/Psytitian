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
dojo.provide("psytitian.widget.AgentForm");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.provide("dijit.form.Form");
dojo.require("psytitian.agent");

dojo.declare("psytitian.widget.AgentForm",
[dijit._Widget, dijit._Templated, dijit.form.Form], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/AgentForm.html"),
    
	onSubmit:function( /*Event*/ e) {
		console.log("Submit");
		this.postSubmit();
		return false;
	},
	
	onReset:function( /*Event*/ e) {
		console.log("Reset");
		this.postReset();
		this.reset();
		return false;
	},
	
	postSubmit:function() {
		// summary: hook after successful commit
	},
	
	postReset:function() {
		// summary: hook after reset complete
	}
});


console.log("PsyTitian Agent Form GO!");