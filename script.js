const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const bookList = document.querySelector('#book-list');

/* eslint-disable no-unused-vars */

let booksArray = [];

function timeRefresh() {
  const rfRate = 1000;
  const mytime = setTimeout('dispClock()', rfRate);
}

function dispClock() {
  const dateTime = new Date();
  document.getElementById('datetime').innerHTML = dateTime;
  timeRefresh();
}

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
      bookTitle.innerHTML = `'${title}'`;
      bookAuthor.innerHTML = `by ${author}`;
      bookIdNumber.innerHTML = idNum;
      removeButton.innerHTML = 'Remove';
      bookInfo.classList.add('bookinfo');
      bookIdNumber.classList.add('counter');
      removeButton.classList.add('btn', 'rmbtn');

      if (idNum % 2 === 0) {
        bookBlock.classList.add('bookblock1');
      } else {
        bookBlock.classList.add('bookblock2');
      }

      bookInfo.append(bookTitle, bookAuthor, bookIdNumber);
      bookBlock.append(bookInfo, removeButton);
      bookList.append(bookBlock);

      BookEntry.remove(removeButton);
    }
    creaateAndSet(this.title, this.author, this.idNum);
  }

  static remove(element) {
    function removeBook() {
      booksArray = booksArray.filter(
        (book) => +book.idNum !== +this.parentNode.children[0].children[2].innerHTML,
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
        booksArray.length,
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

function changeSection(id) {
  if (id.innerHTML === 'List') {
    document.getElementById('list').style.display = 'block';
    document.getElementById('add-new-book').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
  } else if (id.innerHTML === 'Add book') {
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-new-book').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
  } else if (id.innerHTML === 'Contact') {
    document.getElementById('list').style.display = 'none';
    document.getElementById('add-new-book').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
  }
}
