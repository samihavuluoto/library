const Library = [];

class Book {
    constructor(title, author, length, read){
        this.title = title;
        this.author = author;
        this.length = length;
        this.read = read;
    }

    addBookToLibrary = () => {
        Library.push(this);
    }

    changeRead = () => {
        this.read = !this.read;
    }
}

function addBook(title, author, length) {
    let read = document.getElementById("read").checked;
    let newBook = new Book(title, author, length, read);
    newBook.addBookToLibrary();
}


function displayBooks() {
    let rows = document.querySelectorAll(".created")
    
    for (let i = 0; i < rows.length; i++) {
        rows[i].remove();
    }

    Library.forEach(function(element, index){
        let table = document.getElementById("table");
        let newRow = document.createElement("tr");
        newRow.classList.add("created");
        table.appendChild(newRow);

        let newCell = document.createElement("td");
        newCell.textContent = element.title;
        newRow.appendChild(newCell);

        let newCell2 = document.createElement("td");
        newCell2.textContent = element.author;
        newRow.appendChild(newCell2);

        let newCell3 = document.createElement("td");
        newCell3.textContent = element.length;
        newRow.appendChild(newCell3);

        let newCell4 = document.createElement("td");
        newRow.appendChild(newCell4);

        let readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readCheckbox.checked = element.read ? true : false;
        readCheckbox.addEventListener("change", () => {
            Library[index].changeRead();
            displayBooks();
        });
        newCell4.appendChild(readCheckbox);

        let newCell5 = document.createElement("td");
        newRow.appendChild(newCell5);

        let removeButton = document.createElement("button");
        removeButton.textContent = "REMOVE";
        removeButton.addEventListener("click", () => {
            Library.splice(index, 1);
            displayBooks();
        });
        newCell5.appendChild(removeButton);
    });
}

const bookDialog = document.getElementById("book-dialog");

const bookForm = document.getElementById("book-form");

const bookTitle = document.getElementById("title");

const bookAuthor = document.getElementById("author");

const bookLength = document.getElementById("length");

const bookRead = document.getElementById("read");

const submitButton = document.getElementById("submit-button");

const bookClose = document.getElementById("book-close");

const newBookButton = document.querySelector("#addBook");

const removeButton = document.querySelectorAll(".remove-button");


newBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

submitButton.addEventListener("click", (event) => {
    if(bookTitle.value !== ""){
        addBook(bookTitle.value, bookAuthor.value, bookLength.valueAsNumber);
    }
    event.preventDefault();
    bookDialog.close();
    bookForm.reset();
    displayBooks();
});

bookClose.addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

document.addEventListener("keyup", (event) => {
    if(event.key === "Escape"){
        bookForm.reset();
        bookDialog.close();
    }
})

