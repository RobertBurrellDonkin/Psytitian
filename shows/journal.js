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
function(doc, req) {
	// !json templates.journal
	// !code vendor/couchapp/template.js
	
	var head = template(templates.journal.header, {app_root: "../../"});
	
	if (doc) {
		var content = template(templates.journal.entry, {});
	} else {
		if (req && req.userCtx && req.userCtx.name) {
			var content = template(templates.journal.compose, {user: req.userCtx.name});	
		} else {
			var content = template(templates.journal.auth, {});	
		}
	}
	return {body: head + content + template(templates.journal.footer, {})};
}