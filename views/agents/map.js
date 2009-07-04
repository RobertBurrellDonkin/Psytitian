function(doc) {
	for (type in doc.types) {
		if (doc.types[type] == "http://purl.org/dc/terms/Agent") {
			var isAgent = true;
		}
	}

	if (isAgent) {
		var title = doc._id;
		if (doc.title) {
			title = doc.title;
		}
		emit(doc._id, title);
	}
};