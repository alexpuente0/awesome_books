const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const addButton = document.getElementById("button");
const bookList = document.querySelector(".book-list");

function addBook() {
  const book = `
    <div class="book">
        <h4 class="book-title">${titleInput.value}</h4>
        <h4 class="book-author">${authorInput.value}</h4>
        <button class="remove-btn" onclick="removeBookFromList(this)">Remove</button>
    </div>`;

  bookList.insertAdjacentHTML("beforeend", book);
}

addButton.addEventListener("click", addBook);

function removeBookFromList(e) {
  e.parentElement.remove();
}
