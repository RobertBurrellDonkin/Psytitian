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

dojo.require("psytitian.psytitian");
dojo.provide("psytitian.store");

if (!psy.store) {
	psy.store = {
		/* Indexes stores by backing URL */
		_storesByUrl: {},
		
		
		forUrl : function(url) {
			// summary: Returns a store for the given url
			var store = this._storesByUrl[url];
			if (store) {
				return store;
			} else {
				store = {
						_url: url,
						_widgets: [],
						store: null,
						load: function() {
							// Summary Starts loading data from store.
					        //         Data will be used for all widgets.
							psy.store.loadItems({
								url: this._url,
								onItemLoad: dojo.hitch(this, function(items) {;
									this.store = new dojo.data.ItemFileReadStore({data:items});
					        		dojo.forEach(this._widgets, dojo.hitch(this, function(widget) {
							        	widget.store = this.store;
							        	widget.attr('displayedValue', "");
							        	widget.attr('disabled', false);
									}));
								})
							});
						},
						
						add: function(widget) {
						    widget.attr('displayedValue', "Loading...");
						    widget.attr('disabled', true);
							this._widgets.push(widget);
							return this;
						},
				};
				this._storesByUrl[url] = store;
			};
			return store;
		},
		
		
		loadItems: function (ioArgs) {
			// summary: loads JSON from a CouchDB View
			// 			and converts it to Dojo ItemFileStoreForm format
			
			if (!ioArgs.onItemLoad) {
				if (ioArgs.load) {
					ioArgs.onItemLoad = ioArgs.load;
				} else {
					ioArgs.onItemLoad = function(items) {
						console.log(items);
					};
				};
			}
		    
			ioArgs.load = function(data, ioargs) {
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
		        this.onItemLoad(items);
		    };
		    
		    if (!ioArgs.error) {
		    	ioArgs.error = function(error, ioargs) {
			        console.warn(error);
			    };
		    }
		    
		    ioArgs.handleAs = "json";
		    
		    dojo.xhrGet(ioArgs); 
		}
	};
}