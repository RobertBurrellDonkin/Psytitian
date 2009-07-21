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
dojo.provide("psytitian.widget.BibliographicResource");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("psytitian.psytitian");
dojo.require("psytitian.widget.TagEditor");

dojo.declare("psytitian.widget.BibliographicResource",
[dijit._Widget, dijit._Templated], {
    templateString:null,
    templatePath: dojo.moduleUrl("psytitian", "widget/BibliographicResource.html"),
    
    data: {},
	
	_setDataAttr: function(value) {
		dojo.query(this.introNode).empty();
		dojo.query(this.authorNode).empty();
		dojo.query(this.authorsHeaderNode).empty();
		if (value.types && value.types.indexOf(DC_BIBLIOGRAPHIC_RESOURCE) != -1) {
    		dojo.create("h2", { innerHTML: 'Bibliography' }, this.introNode);
            if (value.source) {
        		dojo.create("h3", { innerHTML: "Source" }, this.introNode);
                var source = value.source;
                if (source.substring(0,7) == "http://") {
                    source = "<a href='" + source + "' target='_blank'>" + source + "</a>";
                }
        		dojo.create("p", { innerHTML: source }, this.introNode);
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
            	dojo.create("h3", { innerHTML: "Publication" }, this.introNode);
            	dojo.create("p", { innerHTML:  publicationDetails}, this.introNode);
            }
            
            if (value.abstract) {
        		dojo.create("h3", { innerHTML: "Abstract" }, this.introNode);
        		dojo.create("p", { innerHTML: value.abstract }, this.introNode);
            }
            
            if (value.contributor && value.contributor.length>0 ) {
            	dojo.create('h3', {innerHTML: 'Authors'}, this.authorsHeaderNode);
            	this._contributorTags = new psytitian.widget.TagEditor({
	            		id: dijit.getUniqueId("ContributorTags"), 
	            		readOnly: true,
	            		baseUrl: this.baseHomeUrl,
	            		value: value.contributor
            		}, this.authorsNode);
            }
		}
		this.data = value;
	},
	
	_getDataAttr: function(value) {
		return this.data;
	},
	
	baseHomeUrl: "",
	_getBaseHomeUrlAttr: function() {
		return this.baseHomeUrl;
	},
	_setBaseHomeUrlAttr: function(value) {
		this.baseHomeUrl = value;
		if (this._contributorTags) {
			this._contributorTags.attr('baseUrl', value);
		}
	}
});