const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('button');
const bookList = document.querySelector('.book-list');

let booksArray = [];

/* eslint-disable no-unused-vars */

class BookEntry {
  constructor(title, author, idNum) {
    this.title = title;
    this.author = author;
    this.idNum = idNum;
  }

  add() {
    function creaateAndSet(title, author, idNum) {
      const bookBlock = document.createElement('div');
      const bookInfo = document.createElement('div');
      const bookTitle = document.createElement('h4');
      const bookAuthor = document.createElement('h4');
      const bookIdNumber = document.createElement('h4');
      const removeButton = document.createElement('button');
      bookTitle.innerHTML = `${title}`;
      bookAuthor.innerHTML = `by ${author}`;
      bookIdNumber.innerHTML = idNum;
      removeButton.innerHTML = 'Remove';

      bookInfo.append(bookTitle, bookAuthor, bookIdNumber);
      bookBlock.append(bookInfo, removeButton);
      bookList.append(bookBlock);

      BookEntry.remove(removeButton);
    }
    creaateAndSet(this.title, this.author, this.id);
  }

  static remove(element) {
    function removeBook() {
      booksArray = booksArray.filter(
        (book) =>
          +book.id !== +this.parentNode.children[0].children[2].innerHTML
      );
      this.parentNode.remove();

      booksArray.forEach((book, i) => {
        bookList.children[i].children[0].children[2].innerHTML = i;
        book.idNum = i;
      });
      localStorage.setItem('bookdata', JSON.stringify(booksArray));
    }
    element.addEventListener('click', removeBook);
  }

  static addBooks() {
    if (titleInput.value !== '' && authorInput.value !== '') {
      const newBook = new BookEntry(
        titleInput.value,
        authorInput.value,
        booksArray.length
      );
      newBook.add();
      booksArray.push(newBook);

      localStorage.setItem('bookdata', JSON.stringify(booksArray));

      titleInput.value = '';
      authorInput.value = '';
    }
  }

  static loadBooks() {
    JSON.parse(localStorage.getItem('bookdata')).forEach((book, i) => {
      const newBook = new BookEntry(book.title, book.author, i);
      newBook.add();
      booksArray.push(newBook);
    });
  }
}

addButton.addEventListener('click', BookEntry.addBooks);

BookEntry.loadBooks();

// The Previous iteration of the code

/* 
function removeBook(e) {
  booksArray.splice(e.parentElement.children[2].innerHTML, 1);

  e.parentElement.remove();

  booksArray.forEach((book, i) => {
    book.id = i;
    bookList.children[i].children[2].innerHTML = i;
  });

  localStorage.setItem('bookdata', JSON.stringify(booksArray));
}

function renderBook(title, author, id) {
  const book = `
      <div class='book'>
          <h4 class='book-title'>${title}</h4>
          <h4 class='book-author'>${author}</h4>
          <h4 class='book-id'>${id}</h4>
          <button class='remove-btn' onclick='removeBook(this)'>Remove</button>
      </div>`;

  bookList.insertAdjacentHTML('beforeend', book);
}

function loadBooks() {
  if (localStorage.getItem('bookdata')) {
    booksArray = JSON.parse(localStorage.getItem('bookdata'));
  } else {
    booksArray = [];
  }

  booksArray.forEach((book) => {
    renderBook(book.title, book.author, book.id);
  });
}

function addBook() {
  if (localStorage.getItem('bookdata')) {
    booksArray = JSON.parse(localStorage.getItem('bookdata'));
  }
  booksArray.push({
    title: titleInput.value,
    author: authorInput.value,
    id: booksArray.length,
  });
  localStorage.setItem('bookdata', JSON.stringify(booksArray));

  renderBook(titleInput.value, authorInput.value, booksArray.length);
}

addButton.addEventListener('click', addBook);
loadBooks(); */
