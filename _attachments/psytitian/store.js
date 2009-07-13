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
									try {
										this.store = new dojo.data.ItemFileReadStore({data:items});
						        		dojo.forEach(this._widgets, dojo.hitch(this, function(widget) {
						        			try {
									        	widget.store = this.store;
									        	widget.attr('displayedValue', "");
									        	widget.attr('disabled', false);
						        			} catch (e) {
						        				console.log("Cannot set store on widget");
						        				console.warn(e);
						        				console.log(widget);
						        			}
										}));
									} catch (e) {
										console.log("Cannot load items into store");
										console.warn(e);
										console.log(items);
									}
								})
							});
						},
						
						add: function(widget) {
							if (widget) {
							    widget.attr('displayedValue', "Loading...");
							    widget.attr('disabled', true);
							    
							    for (i in this._widgets) {
							    	if (this._widgets[i] == widget) {
							    		var alreadyAdded = true;
							    	}
							    }
							    if (!alreadyAdded) {
							    	this._widgets.push(widget);
							    }
							} else {
								console.log("Widget missing");
							}
							return this;
						},
						
						addById: function(widgetId) {
							return this.add(dijit.byId("addPaperDialogPublisher"));
						},
						
						remove: function(widget) {
							if (widget) {
								var index = this._widgets.indexOf(widget);
								if (index) {
									this._widgets.splice(index, 1);
								}
							}
						}
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
		    		console.log("Store load failed");
		    		console.log(ioargs);
			        console.warn(error);
			    };
		    }
		    
		    ioArgs.handleAs = "json";
		    
		    dojo.xhrGet(ioArgs); 
		}
	};
}