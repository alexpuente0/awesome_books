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
      bookTitle.innerHTML = `"${title}"`;
      bookAuthor.innerHTML = `by ${author}`;
      bookIdNumber.innerHTML = idNum;
      removeButton.innerHTML = "Remove";
      bookInfo.classList.add("bookinfo");
      bookIdNumber.classList.add("counter");
      removeButton.classList.add("rmbtn");
          
      if (idNum % 2 === 0) {
        bookBlock.classList.add("bookblock1");
      } else {
        bookBlock.classList.add("bookblock2");
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
