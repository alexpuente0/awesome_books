const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('button');
const bookList = document.querySelector('.book-list');


function addBook() {
    const book = `
    <div class="book${x}">
        <h4 class="book-title">${titleInput.value}</h4>
        <h4 class="book-author">${authorInput.value}</h4>
        <button class="remove-btn">Remove</button>
    </div>`;

  
    bookList.insertAdjacentHTML("beforeend", book);
      const removebook = document.getElementsByClassName("remove-btn"); 
removebook.addEventListener("click", deleteBook);
    
}

addButton.addEventListener('click' ,addBook);


function deleteBook() {
  this.parentElement.remove()
}

