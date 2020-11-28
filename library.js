let myLibrary = [];
const localStorage = window.localStorage;
const cardContainer = document.querySelector('.card-container');
const addBookButton = document.getElementById('addBookButton');
const titleTextField = document.getElementById('btitle');
const authorTextField = document.getElementById('author');
const pagesTextField = document.getElementById('Pages');
const checkbox = document.getElementById('status');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

loadData();

function addBookToLibrary(book) {
    myLibrary.push(book);
    saveToLocalStorage(myLibrary);
    displayBooks();
}

function displayBooks() {
    refresh()
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', myLibrary.indexOf(book)); // Adding this to be able to identify each card (book)
        const title = document.createElement('h3');
        title.textContent = `${book.title}`;
        const author = document.createElement('p');
        author.textContent = `${book.author}`;
        const status = document.createElement('button');
        status.textContent = book.read ? 'Finished' : 'Not Finished';
        status.className = 'status-btn';
        status.style.backgroundColor = book.read ?  '#61b15a' : '#ff4b5c'
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeButton';

        status.addEventListener('click', (element) => {
            const elementStyle = element.target.style;
            if (element.target.innerText == 'Finished') {
                element.target.innerText = 'Not Finished';
                elementStyle.backgroundColor = '#ff4b5c';
            } else {
                element.target.innerText = 'Finished';
                elementStyle.backgroundColor = '#61b15a';
            }
            
        })

        // Removing card based on the on the index of the DOM element and the array
        removeButton.addEventListener('click', (element) => {
            const cardToRemove = element.target.parentNode;
            myLibrary.splice(cardToRemove.dataset.index, 1);
            localStorage.setItem('books', JSON.stringify(myLibrary));
            cardToRemove.remove();
        });
        
        let elements = [title, author, status, pages, removeButton];
        elements.forEach(element => {
            card.appendChild(element);
        });

        cardContainer.appendChild(card);
    });
    
}

function clearForm() {
    titleTextField.value = '';
    authorTextField.value = '';
    pagesTextField.value = '';
    checkbox.checked = false;

}

function refresh() {
   const cards = document.querySelectorAll('.card'); 

   for (const card of cards) {
       card.remove();
   }
}

addBookButton.addEventListener('click', () => {
    const title = titleTextField.value;
    const author = authorTextField.value;
    const pages = pagesTextField.value;
    const status = checkbox.checked;

    if (title == '' || author == '' || pages == '') {
        alert('Please fill the remaining fields!')
    } else {
    const newBook = new Book(title, author, pages, status);
    console.log(newBook)
    addBookToLibrary(newBook);

    clearForm()
    }
});


// Check if local storage is available

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function saveToLocalStorage(data) {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('books', JSON.stringify(data));
    } else {
        console.log("Failed to save book on Local Storage!")
    }
}

function loadData() {
    if (localStorage.length > 0 && storageAvailable('localStorage')) {
         myLibrary = JSON.parse(localStorage.getItem('books'));
    }
    displayBooks()
}