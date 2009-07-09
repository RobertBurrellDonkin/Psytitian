function(doc) {
	for (type in doc.types) {
		if (doc.types[type] == "http://www.w3.org/2004/02/skos/core#Concept") {
			var isConcept = true;
		}
	}

	if (isConcept) {
		var title = doc._id;
		if (doc.title) {
			title = doc.title;
		}
		emit(doc._id, title);
	}
};