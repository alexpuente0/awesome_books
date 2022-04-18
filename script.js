const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const addButton = document.getElementById("button");
const bookList = document.querySelector(".book-list");

let booksArray = [];

function addBook() {
    booksArray.push({title: titleInput.value, author: authorInput.value, id: booksArray.length});

  const book = `
    <div class="book">
        <h4 class="book-title">${titleInput.value}</h4>
        <h4 class="book-author">${authorInput.value}</h4>
        <h4 class="book-id">${booksArray[booksArray.length - 1]['id']}</h4>
        <button class="remove-btn" onclick="removeBookFromList(this)">Remove</button>
    </div>`;

  bookList.insertAdjacentHTML("beforeend", book);

  console.log(booksArray);

  localStorage.setItem("bookdata", JSON.stringify(booksArray));

}

addButton.addEventListener("click", addBook);

function removeBookFromList(e) {    
    booksArray.splice(+e.parentElement.children[2].innerHTML, 1);

    e.parentElement.remove();

    booksArray.forEach((book, i) => {
        book.id = i;
        bookList.children[i].children[2].innerHTML = i;
    });

      localStorage.setItem("bookdata", JSON.stringify(booksArray));

}

function renderBooks(title, author, id) {
  const book = `
    <div class="book">
        <h4 class="book-title">${title}</h4>
        <h4 class="book-author">${author}</h4>
        <h4 class="book-id">${id}</h4>
        <button class="remove-btn" onclick="removeBookFromList(this)">Remove</button>
    </div>`;

  bookList.insertAdjacentHTML("beforeend", book);
}

function loadBooks() {
  booksArray = localStorage.getItem(JSON.parse("bookdata"))
  booksArray.forEach((book) => {
renderBooks(book.title, book.author, book.id);
  })
}


