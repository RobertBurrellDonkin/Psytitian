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
	// !json templates.paper
	// !code vendor/couchapp/template.js
	
	provides("html", function() {
		const APP_ROOT = '../../';
		const DB_ROOT = '../../../../';
		
		send(template(templates.paper.header, {app_root: APP_ROOT}));
		
		var row, summary;
		while(row = getRow()) {
			if(row.value) {				
				send(template(templates.paper.summary, {
					id: row.id,
					title: row.value,
					app_root: APP_ROOT,
					db_root: DB_ROOT
				}) );
			}
		}
		
		return template(templates.journal.footer, {});
	});
}