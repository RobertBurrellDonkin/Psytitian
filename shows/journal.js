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
	
	const APP_ROOT = '../../';
	const DB_ROOT = '../../../../';
	
	var content = template(templates.journal.base, {app_root: APP_ROOT}) + 
					template(templates.journal.dojo, {app_root: APP_ROOT});
	if (doc) {
		
		content = content + 
			template(templates.journal.header, {app_root: APP_ROOT, title_suffix: ''}) + 
			template(templates.journal.entry, {
				title: doc.title,
				updated: doc.updated,
				published: doc.published,
				summary: doc.summary,
				content: doc.content,
				id: doc.id,
				author: doc.author,
				app_root: APP_ROOT,
				db_root: DB_ROOT
			}) 
			+ template(templates.journal.footer, {});
	} else {
		if (req.userCtx.name) {
			var user = req.userCtx.name;
		} else {
			var user = "anon";
		}
		content = content +
			template(templates.journal.compose_scripts, {app_root: APP_ROOT}) +
			template(templates.journal.header, {app_root: APP_ROOT, title_suffix: ' (' + user + ')'}) +
			template(templates.journal.compose, {user: user, app_root: APP_ROOT});
		
		// CouchDB is hard to integrate with Apache authentication
//
//		if (req && req.userCtx && req.userCtx.name) {
//			var content = template(templates.journal.compose, {user: req.userCtx.name, app_root: "../../"});	
//		} else {
//			var content = template(templates.journal.auth, {app_root: "../../"});	
//		}
	}
	return {body: content};
}