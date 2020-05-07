class Book {
	constructor(title, author, genre, pageCount, publisherID, ISBN) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.pageCount = pageCount;
		this.publisherID = publisherID;
		this.ISBN = ISBN;
	}
}

class BookFactory {
	existingBooks = {};
	existingBook = null;
}

BookFactory.createBook = function (title, author, genre, pageCount, publisherID, ISBN) {
	existingBook = this.existingBooks[ISBN];

	if (existingBook) {
		return existingBook;
	} else {
		var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
		this.existingBooks[ISBN] = book;
		return book;
	}
}

class BookRecordManager {
	bookRecordDatabase = {};
}

BookRecordManager.addBookRecord = function (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
	var book = BookFactory.createBook(id, title, author, genre, pageCount, publisherID, ISBN);

	this.bookRecordDatabase[id] = {
		checkoutMember,
		checkoutDate,
		dueReturnDate,
		availability,
		book,
	}
}

BookRecordManager.updateCheckoutStatus = function (id, newStatus, checkoutDate, checkoutMember, newReturnDate) {
	var record = this.bookRecordDatabase[id];
	record.availability = newStatus;
	record.checkoutDate = checkoutDate;
	record.checkoutMember = checkoutMember;
	record.dueReturnDate = newReturnDate;
}

BookRecordManager.extendCheckoutPeriod = function (id, newReturnDate) {
	this.bookRecordDatabase[id].dueReturnDate = newReturnDate;
}

BookRecordManager.isPastDue = function () {
	const currentDate = new Date();

	return currentDate.getTime() > Date.parse(this.bookRecordDatabase[id].dueReturnDate);
}