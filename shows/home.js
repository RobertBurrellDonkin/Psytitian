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
function(doc, req) {
  if(doc) {
	  var style = '<style type="text/css">@import "/citation/_design/cite/dijit/themes/tundra/tundra.css";@import "/citation/_design/cite/dojo/resources/dojo.css";@import "/citation/_design/cite/style/main.css";@import "/citation/_design/cite/psytitian/resources/psytitian.css";</style>';
	  var dojo = '<script type="text/javascript" src="/citation/_design/cite/dojo/dojo.js" djConfig="parseOnLoad:true, isDebug:true"></script>';
	  var preamble = '<script type="text/javascript">dojo.require("dojo.parser");dojo.require("psytitian.widget.Thing");</script>';
	  var head = '<head><title>' + doc._id + '</title>' + style + dojo + preamble + '</head>';
	  var body = '<body class="tundra"><div dojoType="psytitian.widget.Thing" conceptUrl="../../_view/concept" baseHomeUrl="./" url="/citation/' + doc._id + '"></div></body>';
	  return {body: '<html>' + head + body + '</html>'};
  }
}
