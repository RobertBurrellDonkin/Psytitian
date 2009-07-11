function(doc, req) {
  if(doc) {
	  var style = '<style type="text/css">@import "/citation/_design/cite/dijit/themes/tundra/tundra.css";@import "/citation/_design/cite/dojo/resources/dojo.css";@import "/citation/_design/cite/style/main.css";@import "/citation/_design/cite/psytitian/resources/psytitian.css";</style>';
	  var dojo = '<script type="text/javascript" src="/citation/_design/cite/dojo/dojo.js" djConfig="parseOnLoad:true, isDebug:true"></script>';
	  var preamble = '<script type="text/javascript">dojo.require("dojo.parser");dojo.require("psytitian.widget.Thing");</script>';
	  var head = '<head><title>' + doc._id + '</title>' + style + dojo + preamble + '</head>';
	  var body = '<body class="tundra"><div dojoType="psytitian.widget.Thing" baseHomeUrl="./" url="/citation/' + doc._id + '"></div><h1>' + doc._id + '</h1></body>';
	  return {body: '<html>' + head + body + '</html>'};
  }
}
