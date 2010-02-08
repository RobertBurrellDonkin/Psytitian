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

const HTTP_NOT_FOUND='404';
const HTTP_CONFLICT=409;

const DC_BIBLIOGRAPHIC_RESOURCE="http://purl.org/dc/terms/BibliographicResource";
const DC_AGENT="http://purl.org/dc/terms/Agent";

const FOAF_AGENT='http://xmlns.com/foaf/0.1/Agent';
const FOAF_PERSON='http://xmlns.com/foaf/0.1/Person';
const FOAF_GROUP='http://xmlns.com/foaf/0.1/Group';
const FOAF_ORGANIZATION='http://xmlns.com/foaf/0.1/Organization';

const SKOS_CONCEPT="http://www.w3.org/2004/02/skos/core#Concept";

const ANNOTEA_ANNOTATION="http://www.w3.org/2000/10/annotation-ns#Annotation";
const ANNOTEA_TYPE_SEE_ALSO="http://www.w3.org/2000/10/annotationType#SeeAlso";
const ANNOTEA_TYPE_QUESTION="http://www.w3.org/2000/10/annotationType#Question";
const ANNOTEA_TYPE_EXPLANATION="http://www.w3.org/2000/10/annotationType#Explanation";
const ANNOTEA_TYPE_EXAMPLE="http://www.w3.org/2000/10/annotationType#Example";
const ANNOTEA_TYPE_COMMENT="http://www.w3.org/2000/10/annotationType#Comment";
const ANNOTEA_TYPE_CHANGE="http://www.w3.org/2000/10/annotationType#Change";
const ANNOTEA_TYPE_ADVICE="http://www.w3.org/2000/10/annotationType#Advice";

const ATOM = "http://www.w3.org/2005/Atom";

dojo.require("dojo.date.stamp");
dojo.provide("psytitian.psytitian");
if (!psy) {
	var psy = {
		version: '0.1-SNAPSHOT',
		annotationTypes: {
				identifier: "url",
				label: "name",
				items: [
				        {name: "See Also", url: ANNOTEA_TYPE_SEE_ALSO},
				        {name: "Question", url: ANNOTEA_TYPE_QUESTION},
				        {name: "Explanation", url: ANNOTEA_TYPE_EXPLANATION},
				        {name: "Example", url: ANNOTEA_TYPE_EXAMPLE},
				        {name: "Comment", url: ANNOTEA_TYPE_COMMENT},
				        {name: "Change", url: ANNOTEA_TYPE_CHANGE},
				        {name: "Advice", url: ANNOTEA_TYPE_ADVICE}
				]
		},
		user: "Anonymous",
		dbName: "/psytitian/",
		appName: "Psytitian/",
		
		_addStandardJson: function(args, json) {
			if (!args.handleAs) {
				args.handleAs = "json";
			};
			args.postData = json;
		},
		_addStandardErrorHandling: function(args) {
			if (!args.errorDocumentExists) {
				args.errorDocumentExists = function(error, ioargs) {
					console.warn("Document already exists");
					console.log(error);
					console.log(ioargs);
				};
			};
			if (!args.errorOther) {
				args.errorOther = function(error, ioargs) {
					console.warn(error);
					console.log(ioargs);
				}
			};
			
			if (!args.error) {
				args.error = function(error, ioargs) {
					if (error.status == HTTP_CONFLICT) {
						this.errorDocumentExists(error, ioargs);
					} else {
						this.errorOther(error, ioargs);
					}
				};
			};
		},
		post: function(args, json) {
				if (!args.url) {
					args.url = psy.dbName;
				};
				this._addStandardErrorHandling(args);
				this._addStandardJson(args, json);
		        dojo.xhrPost(args);
			},

		put: function(args, json) {
				if (args.id) {
					args.url = psy.dbName + args.id;
					if (args.attachment) {
						args.url = args.url + '/' + args.attachment; 
					}
					if (args.rev) {
						args.url = args.url + "?rev=" + args.rev;
					}
				};
				this._addStandardErrorHandling(args);
				this._addStandardJson(args, json);
		        dojo.xhrPut(args);
			},
			
		isType: function(data, typeToMatch) {
				if (data && data.types) {
					for (type in data.types) {
						if (data.types[type] == typeToMatch) {
							return true;
						}
					}
				}
				return false;
		},
			
		isAnnotation: function(data) {
			return this.isType(data, ANNOTEA_ANNOTATION);	
		},
			
		view: function(name) {
				return psy.dbName + "_design/" + psy.appName + "_view/" + name;
			},
		home: function(id) {
				return psy.dbName + "_design/" + psy.appName + "_show/home/" + id;
			},
		attachment: function(id, name) {
				return psy.dbName + encodeURI(id) + '/' + encodeURI(name);
		},
		formatDate: function(date) {
				return dojo.date.stamp.toISOString(date, {selector:'date', zulu:true});
			},
		clearById: function (id) {
				var node = dojo.byId(id);
				while(node.hasChildNodes()) node.removeChild(node.firstChild);
				return node;
			}
	};
};