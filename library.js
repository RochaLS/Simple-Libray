let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        const readMessage = this.read ? 'Finished' : 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${readMessage}.`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach(book => {
        console.log(book.title)
    });
}

let book1 = new Book('The Hunger Games', 'Suzanne Collins', 203, true);
let book2 = new Book('The Hunger Games: Catching Fire', 'Suzanne Collins', 203, false);
let book3 = new Book('The Hunger Games: Mockingjay', 'Suzanne Collins', 203, false);


addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
displayBooks()