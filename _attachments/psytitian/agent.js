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
dojo.require("psytitian.psytitian");
dojo.provide("psytitian.agent");

if (!psy.agent) {
	psy.agent = new function() {
		this.type={
				base:[DC_AGENT,FOAF_AGENT],
				org:[DC_AGENT,FOAF_AGENT, FOAF_ORGANIZATION],
				group:[DC_AGENT,FOAF_AGENT, FOAF_GROUP],
				person:[DC_AGENT,FOAF_AGENT, FOAF_PERSON]
		};
	};
}