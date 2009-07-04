function(doc, req) {
  if(doc) {
	  var style = '<style type="text/css">@import "/citation/_design/cite/dijit/themes/tundra/tundra.css";@import "/citation/_design/cite/dojo/resources/dojo.css";@import "/citation/_design/cite/style/main.css";</style>';
	  var head = '<head><title>' + doc._id + '</title>' + style + '</head>';
	  var body = '<body class="tundra"><h1>' + doc._id + '</h1>';
	  
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
	          paper = paper + "<h3>Source</h3><p>" + source + "</p>"
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
