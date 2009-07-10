function(doc, req) {
  if(doc) {
	  var style = '<style type="text/css">@import "/citation/_design/cite/dijit/themes/tundra/tundra.css";@import "/citation/_design/cite/dojo/resources/dojo.css";@import "/citation/_design/cite/style/main.css";@import "/citation/_design/cite/psytitian/resources/psytitian.css";</style>';
	  var dojo = '<script type="text/javascript" src="/citation/_design/cite/dojo/dojo.js" djConfig="parseOnLoad:true, isDebug:true"></script>';
	  var preamble = '<script type="text/javascript">dojo.require("dojo.parser");dojo.require("psytitian.widget.Thing");</script>';
	  var head = '<head><title>' + doc._id + '</title>' + style + dojo + preamble + '</head>';
	  var body = '<body class="tundra"><div dojoType="psytitian.widget.Thing" url="/citation/' + doc._id + '"></div><h1>' + doc._id + '</h1>';
	  
	  if (doc.created) {
		  body = body + "<p>Loaded on " + doc.created + "</p>";
	  }
	  
	  for (type in doc.types) {
		  if (doc.types[type] == "http://purl.org/dc/terms/BibliographicResource") {
			  var isPaper = true;
		  }
	  }
	  
	  if (isPaper) {
		  var paper = "<h2>Bibliography</h2>";
		  
          var source = doc.source;
          if (source) {
        	  
	          if (source.substring(0,7) == "http://") {
	              source = "<a href='" + source + "' target='_blank'>" + source + "</a>";
	          }
	          paper = paper + "<h3>Source</h3><p>" + source + "</p>";
          }
          
          var publicationDetails;
          if (doc.publisher) {
              publicationDetails = doc.publisher;
          }
          if (doc.issued) {
              if (publicationDetails) {
              	publicationDetails = publicationDetails + ', ' + doc.issued;    
              } else {
                  publicationDetails = "First published " + doc.issued;
              }
              
          }
          if (publicationDetails) {
        	  paper = paper + "<h3>Publication</h3><p>" + publicationDetails + "</p>";
          }
          
          if (doc.abstract) {
        	  paper = paper + "<h3>Abstract</h3><p>" + doc.abstract + "</p>";
          }
          body = body + '<div class="results">' + paper + '</div>';
	  }
	  
	  body = body + '</body>';
	  return {body: '<html>' + head + body + '</html>'};
  }
}
