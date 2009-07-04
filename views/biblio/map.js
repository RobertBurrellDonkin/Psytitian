function(doc) {
	for (type in doc.types) {
		if (doc.types[type] == "http://purl.org/dc/terms/BibliographicResource") {
			var isPaper = true;
		}
	}

	if (isPaper) {
		var title = doc._id;
		if (doc.title) {
			title = doc.title;
		}
		emit(doc._id, title);
	}
};