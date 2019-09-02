// ///////////////////////////////////////////////////////////////
// Model
// ///////////////////////////////////////////////////////////////
const Model = (function() {
	// Create an object to store data
	const Book = function(title, author, isbn, id) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.id = id;
	};

	const data = {
		book: []
	};

	return {
		addBookItem: function(title, author, isbn) {
			let newBook, id;

			// Generating a suitable id for each element
			if (data.book.length > 0) {
				id = data.book[data.book.length - 1].id + 1;
			} else {
				id = 0;
			}

			// create a new item using our constructor
			newBook = new Book(title, author, isbn, id);

			// push our new item to the array
			data.book.push(newBook);

			// return the item
			return newBook;
		},

		removeBookItem: function(id) {
			let ids, index;

			// Get an array of ids
			ids = data.book.map(function(el) {
				return el.id;
			});

			// Get the index of the id
			index = ids.indexOf(id);

			if (index !== -1) {
				// Remove the element in the index specified
				data.book.splice(index, 1);
			}
		},

		testing: function() {
			console.log(data);
		}
	};
})();

// ///////////////////////////////////////////////////////////////
// View
// ///////////////////////////////////////////////////////////////
const View = (function() {
	return {
		// 1. Get input values
		getInput: function() {
			return {
				title: document.getElementById("title").value,
				author: document.getElementById("author").value,
				isbn: document.getElementById("isbn").value
			};
		},

		// Display alert function
		showAlert: function(message) {
			let snackbar, element;

			element = ".container";
			snackbar = `<div class="snackbar">${message}</div>`;

			document.querySelector(element).insertAdjacentHTML("beforeend", snackbar);

			setTimeout(function() {
				document.querySelector(".snackbar").remove();
			}, 3000);
		},

		// 3. Add the new item to the ui
		addBookItem: function(obj) {
			let html, element;

			element = ".book__list";
			html = `
			<div class="book" id="book-${obj.id}">
				<div class="book__content">
					<div class="book__title"><span class="book__label">Name:</span>${obj.title}</div>
					<div class="book__author"><span class="book__label">Author:</span>${obj.author}</div>
					<div class="book__number"><span class="book__label">ISBN&nbsp;:</span>${obj.isbn}</div>
				</div>
				<div class="book__delete">
					<button class="book__delete--btn">
						<i class="ion-ios-close-outline"></i>
					</button>
				</div>
			</div>`;

			// Insert the Html into the Dom
			document.querySelector(element).insertAdjacentHTML("beforeend", html);
		},

		// 4. Removing a book item from the ui
		deleteBookItem: function(selectorId) {
			const el = document.getElementById(selectorId);
			el.parentNode.removeChild(el);
		},

		// 5. Clearing the inputs
		clearInputFields: function() {
			let field;

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

const Controller = (function(md, ui) {
	// To do list
	// 1. Add event handlers

	const setUpEventListener = function() {
		document.querySelector(".form__button").addEventListener("click", ctrlAddItem);

		document.addEventListener("keypress", event => {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
		document.querySelector(".right").addEventListener("click", ctrlDeleteItem);
	};

	const ctrlAddItem = function() {
		let input, newBookItem;

		// 1. get data from the input fields
		input = ui.getInput();

		// 2. Check if the input are empty
		if (input.title !== "" && input.author !== "" && !isNaN(input.isbn)) {
			// 3. Add item to the model controller
			newBookItem = md.addBookItem(input.title, input.author, input.isbn);

			// 4. Add item to the view controller
			ui.addBookItem(newBookItem);

			// 5. Show alert
			ui.showAlert("Book added! success");

			// 6. clear the input fields
			ui.clearInputFields();
		} else {
			// 7. Show alert
			ui.showAlert("Please fill in all the fields!");
		}
	};

	const ctrlDeleteItem = function(event) {
		let itemID, splitID, id;
		itemID = event.target.parentNode.parentNode.parentNode.id;

		if (itemID) {
			splitID = itemID.split("-");
			id = parseInt(splitID[1]);

			// 1. Delete item from the data structure
			md.removeBookItem(id);

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

// Data persistence with localstorage
// UI improvements
