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

dojo.provide("psytitian.psytitian");
if (!psy) {
	var psy = new function() {
		this.version = '0.1-SNAPSHOT';
	};
}
if (!psy.dbName) {
	psy.dbName="/citation/";
}
if (!psy.put) {
	psy.put = function(args, json) {
		if (!args.handleAs) {
			args.handleAs = "json";
		};
		if (args.id) {
			args.url = psy.dbName + args.id;
		};
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
			}
		};
		args.postData = json;
		
        dojo.xhrPut(args);
	};
};

if (!psy.clearById) {
	psy.clearById = function (id) {
		var node = dojo.byId(id);
		while(node.hasChildNodes()) node.removeChild(node.firstChild);
		return node;
	}
}
