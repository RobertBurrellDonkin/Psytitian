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
dojo.provide("psytitian.widget.BibliographicResource");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.psytitian");

dojo.declare("psytitian.widget.BibliographicResource",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/BibliographicResource.html"),
    
    data: {},
	
	_setDataAttr: function(value) {
		console.log("[BIBLIO] Setting data");
		console.log(value);
		
		if (value.types && value.types.indexOf(DC_BIBLIOGRAPHIC_RESOURCE) != -1) {
			console.log("Type match");
    		dojo.create("h2", { innerHTML: 'Bibliography' }, this.containerNode);
            if (value.source) {
        		dojo.create("h3", { innerHTML: "Source" }, this.containerNode);
                var source = value.source;
                if (source.substring(0,7) == "http://") {
                    source = "<a href='" + source + "' target='_blank'>" + source + "</a>";
                }
        		dojo.create("p", { innerHTML: source }, this.containerNode);
            }
            
            var publicationDetails;
            if (value.publisher) {
                publicationDetails = value.publisher;
            }
            if (value.issued) {
                if (publicationDetails) {
                	publicationDetails = publicationDetails + ', ' + value.issued;    
                } else {
                    publicationDetails = "First published " + value.issued;
                }
                
            }
            if (publicationDetails) {
            	dojo.create("h3", { innerHTML: "Publication" }, this.containerNode);
            	dojo.create("p", { innerHTML:  publicationDetails}, this.containerNode);
            }
            
            if (value.abstract) {
        		dojo.create("h3", { innerHTML: "Abstract" }, this.containerNode);
        		dojo.create("p", { innerHTML: value.abstract }, this.containerNode);
            }
		} else {
			console.log("Type mismatch");
			dojo.query(this.containerNode).empty();
		}
		console.log(this.containerNode);
		this.data = value;
	},
	
	_getDataAttr: function(value) {
		return this.data;
	}
});