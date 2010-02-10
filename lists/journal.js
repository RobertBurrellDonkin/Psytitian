 /*   
  * Copyright [2010] Robert Burrell Donkin http://robertburrelldonkin.name
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
function(head, req) {
	// !json templates.journal
	// !code vendor/couchapp/template.js
	
	provides("html", function() {
		const APP_ROOT = '../../';
		const DB_ROOT = '../../../../'
		
		send(template(templates.journal.base, {app_root: APP_ROOT}));
		send(template(templates.journal.header, {app_root: APP_ROOT, title_suffix: ''}));
		send("<h3>Contemporary</h3>");
		
		var row, summary;
		while(row = getRow()) {
			
			if(row.value) {
				if (row.value.summary) {
					summary = row.value.summary;
				} else {
					// TODO: Take only first paragraph
					summary = row.value.content;
				}
				
				send(template(templates.journal.summary, {
					title: row.value.title,
					updated: row.value.updated,
					published: row.value.published,
					summary: summary,
					id: row.id,
					author: row.value.author,
					app_root: APP_ROOT
				}) );
			}
		}
		
		return template(templates.journal.footer, {});
	});
}