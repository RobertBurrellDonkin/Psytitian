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

const HTTP_NOT_FOUND='404';
const DC_BIBLIOGRAPHIC_RESOURCE="http://purl.org/dc/terms/BibliographicResource";
const DC_AGENT="http://purl.org/dc/terms/Agent";

function clearById(id) {
	var node = dojo.byId(id);
	while(node.hasChildNodes()) node.removeChild(node.firstChild);
	return node;
}

function couchStore(widgetId, url) {
	var widget = dijit.byId(widgetId);
    widget.attr('displayedValue', "Loading...");
    widget.attr('disabled', true);
    
    _loadItems({url:url, load:function(items) {
        var store = new dojo.data.ItemFileReadStore({data:items});
        widget.store = store;
        widget.attr('displayedValue', "");
        widget.attr('disabled', false);
    }});
}

function _loadItems(args) {
	if (args.load) {
		this.load = args.load;
	} else {
		this.load = function(items) {
			console.log(items);
		}
	}
    
    this._onLoad = function(data, ioargs) {
        var items = {};
        items.identifier = 'id';
        items.label = 'value';
        items.items = [];
        dojo.forEach(
                data.rows,
                function(item){
                    items.items.push(item);
                }
            );
        load(items);
    };
    
    if (args.error) {
    	this.onError = args.error;
    } else {
	    this._onError =  function(error, ioargs) {
	        console.warn(error);
	    };
    }
    
    dojo.xhrGet({
        url: args.url,
        handleAs: "json",
        load: this._onLoad,
        error: this._onError}); 
}