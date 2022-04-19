const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('button');
const bookList = document.querySelector('.book-list');

let booksArray = [];

/* eslint-disable no-unused-vars */

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
  booksArray = JSON.parse(localStorage.getItem('bookdata'));
  booksArray.forEach((book) => {
    renderBook(book.title, book.author, book.id);
  });
}

function addBook() {
  booksArray.push({
    title: titleInput.value,
    author: authorInput.value,
    id: booksArray.length,
  });
  localStorage.setItem('bookdata', JSON.stringify(booksArray));

  renderBook(titleInput.value, authorInput.value, booksArray.length);
}

addButton.addEventListener('click', addBook);
loadBooks();
