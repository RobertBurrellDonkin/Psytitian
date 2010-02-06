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
function(doc) {
	for (type in doc.types) {
		if (doc.types[type] == "http://www.w3.org/2005/Atom") {
			var isAtom = true;
		}
	}

	if (isAtom) {
		emit(doc.updated,
				{
					title: doc.title,
					updated: doc.updated,
					published: doc.published,
					summary: doc.summary,
					content: doc.content,
					id: doc.id,
					author: doc.author
				}
				);
	}
};