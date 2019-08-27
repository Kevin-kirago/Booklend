// ///////////////////////////////////////////////////////////////
// Model
// ///////////////////////////////////////////////////////////////

var Model = (function() {
	// Create an object to store data

	var Book = function(title, author, isbn, id) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.id = id;
	};

	var book = [];

	return {
		addBookItem: function(title, author, isbn) {
			var newBook, id;

			// Generating a suitable id for each element
			if (book.length > 0) {
				id = book[book.length - 1].id + 1;
			} else {
				id = 0;
			}

			// create a new item using our constructor
			newBook = new Book(title, author, isbn, id);

			// push our new item to the array
			book.push(newBook);

			// return the item
			return newBook;
		},

		deleteBookItem: function(id) {
			var index, ids;
			ids = book.map(function(current) {
				return current.id;
			});
			index = ids.indexOf(id);

			if (index !== -1) {
				book.splice(index, 1);
			}
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

	return {
		// 1. Get input values
		getInput: function() {
			return {
				title: document.getElementById("title").value,
				author: document.getElementById("author").value,
				isbn: document.getElementById("isbn").value
			};
		},

		// 2. Add the new item to the view

		addBookItem: function(obj) {
			var html, element;

			element = ".book__list";
			html = `
			<div class="item" id="item-${obj.id}">
				<div class="item__content">
					<div class="item__title"><span class="item__label">Name:</span>${obj.title}</div>
					<div class="item__author"><span class="item__label">Author:</span>${obj.author}</div>
					<div class="item__number"><span class="item__label">ISBN&nbsp;:</span>${obj.isbn}</div>
				</div>
				<div class="item__delete">
					<button class="item__delete--btn">
						<i class="ion-ios-close-outline"></i>
					</button>
				</div>
			</div>`;

			// Insert the Html into the Dom
			document.querySelector(element).insertAdjacentHTML("beforeend", html);
		},

		deleteBookItem: function(selectorId) {
			var el = document.getElementById(selectorId);
			el.parentNode.removeChild(el);
		},

		clearInputFields: function() {
			var field;

			field = document.getElementById("title");

			field.value = "";
			document.getElementById("author").value = "";
			document.getElementById("isbn").value = "";

			field.focus();
		}
	};
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

		document.querySelector(".right").addEventListener("click", ctrlDeleteItem);
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
			ui.addBookItem(newBookItem);

			// 5. clear the input fields
			ui.clearInputFields();
		}
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, id, bookItem;
		itemID = event.target.parentNode.parentNode.parentNode.id;

		if (itemID) {
			splitID = itemID.split("-");
			bookItem = splitID[0];
			id = splitID[1];

			// 1. Delete item from the data structure
			md.deleteBookItem(id);
			console.log(md.testing());

			// 2. Delete item from the ui

			ui.deleteBookItem(itemID);
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
