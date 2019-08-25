// ///////////////////////////////////////////////////////////////
// Model
// ///////////////////////////////////////////////////////////////

var Model = (function() {
	// Create an object to store data

	var Book = function(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	};

	var book = [];

	return {
		addBookItem: function(title, author, isbn) {
			var newBook;

			// create a new item using our constructor
			newBook = new Book(title, author, isbn);

			// push our new item to the array
			book.push(newBook);

			// return the item
			return newBook;
		},

		testing: function() {
			console.log(book);
		}
	};
})();

// ///////////////////////////////////////////////////////////////
// View
// ///////////////////////////////////////////////////////////////

var View = (function() {
	//
	// 2. Get input values

	return {
		getInput: function() {
			return {
				title: document.getElementById("title").value,
				author: document.getElementById("author").value,
				isbn: document.getElementById("isbn").value
			};
		}
	};

	// 4. Add the new item to the view
})();

// ///////////////////////////////////////////////////////////////
// Controller
// ///////////////////////////////////////////////////////////////

var Controller = (function(md, ui) {
	//To do list
	// 1. Add event handlers

	var setUpEventListener = function() {
		document.querySelector(".form__button").addEventListener("click", ctrlAddItem);

		document.addEventListener("keypress", function() {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		var input, newBookItem;

		// 1. get data from the input fields
		input = ui.getInput();

		// 2. Check if the input are empty
		if (input.title !== "" && input.author !== "" && !isNaN(input.isbn)) {
			// 3. Add item to the model controller
			newBookItem = md.addBookItem(input.title, input.author, input.isbn);
			console.log(md.testing());

			// 4. Add item to the view controller

			// 5. clear the input fields
		}
	};

	return {
		init: function() {
			console.log("Application has started");
			setUpEventListener();
		}
	};
})(Model, View);
Controller.init();
