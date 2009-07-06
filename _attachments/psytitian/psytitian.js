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

dojo.provide("psytitian.psytitian");
if (!psy) {
	var psy = new function() {
		this.version = '0.1-SNAPSHOT';
	};
	console.log('Loaded Psytitian');
}
if (!psy.dbName) {
	psy.dbName="/citation/";
}
console.log("PsyTitian GO!");
