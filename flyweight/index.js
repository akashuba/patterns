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

const bookFactory = {
	existingBooks: {},
	existingBook: null,


	createBook(title, author, genre, pageCount, publisherID, ISBN) {
		existingBook = this.existingBooks[ISBN];
	
		if (existingBook) {
			return existingBook;
		} else {
			var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
			this.existingBooks[ISBN] = book;
			return book;
		}
	}

}

const bookRecordManager = {
	bookRecordDatabase: {},

	addBookRecord({ id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability }) {
		var book = bookFactory.createBook(id, title, author, genre, pageCount, publisherID, ISBN);
	
		this.bookRecordDatabase[id] = {
			checkoutMember,
			checkoutDate,
			dueReturnDate,
			availability,
			book,
		}
	},

	updateCheckoutStatus({ id, newStatus, checkoutDate, checkoutMember, newReturnDate }) {
		var record = this.bookRecordDatabase[id];
		record.availability = newStatus;
		record.checkoutDate = checkoutDate;
		record.checkoutMember = checkoutMember;
		record.dueReturnDate = newReturnDate;
	},
	
	extendCheckoutPeriod({ id, newReturnDate }) {
		this.bookRecordDatabase[id].dueReturnDate = newReturnDate;
	},
	
	isPastDue() {
		const currentDate = new Date();
	
		return currentDate.getTime() > Date.parse(this.bookRecordDatabase[id].dueReturnDate);
	}
}

bookRecordManager.addBookRecord({
	id: 1,
	title: 'The Old Man and the Sea',
	author: 'Ernest Hemingway',
	genre: 'Literary Fiction',
	pageCount: 127,
	publisherID: 123,
	ISBN: '0-684-80122-1',
	checkoutDate: 1589047919373,
	checkoutMember: 'Johny',
	dueReturnDate: 1589047919373,
	availability: 'engaged',
})

bookRecordManager.addBookRecord({
	id: 2,
	title: 'The Old Man and the Sea',
	author: 'Ernest Hemingway',
	genre: 'Literary Fiction',
	pageCount: 127,
	publisherID: 123,
	ISBN: '0-684-80122-1',
	checkoutDate: 1589099166710,
	checkoutMember: 'Johny',
	dueReturnDate: 1589099166710,
	availability: 'engaged',
})

bookRecordManager.addBookRecord({
	id: 3,
	title: 'Ready Player One',
	author: 'Ernest Cline',
	genre: 'Science fiction',
	pageCount: 579,
	publisherID: 1234,
	ISBN: '978-1-524-76328-2',
	checkoutDate: 1589099166710,
	checkoutMember: 'Johny',
	dueReturnDate: 1589099166710,
	availability: 'engaged',
})

console.log('bookRecordManager ', bookRecordManager.bookRecordDatabase);
console.log('bookFactory ', bookFactory.existingBooks);
