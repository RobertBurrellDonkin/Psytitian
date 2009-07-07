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

function clearById(id) {
	var node = dojo.byId(id);
	while(node.hasChildNodes()) node.removeChild(node.firstChild);
	return node;
}

function couchStore(widgetId, url) {
	var widget = dijit.byId(widgetId);
    widget.attr('displayedValue', "Loading...");
    widget.attr('disabled', true);
    
    psy.store.loadItems({url:url, 
    	onItemLoad:function(items) {
        	var store = new dojo.data.ItemFileReadStore({data:items});
        	widget.store = store;
        	widget.attr('displayedValue', "");
        	widget.attr('disabled', false);
    }});
}

