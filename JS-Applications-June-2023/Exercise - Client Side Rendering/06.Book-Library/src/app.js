import { html, render } from "../node_modules/lit-html/lit-html.js";
import { mainTemplate } from "./templates/mainTemplate.js";
import { getAllBooks, deleteBook } from "./api.js";
import { tableRowsTemplate } from "./templates/tableRowsTemplate.js";

const documentBody = document.querySelector("body");
render(mainTemplate(), documentBody);

document.getElementById("loadBooks").addEventListener("click", async () => {
  const booksData = await getAllBooks();

  const tableBody = documentBody.querySelector("table tbody");

  const books = [];

  for (const id in booksData) {
    books.push({
      author: booksData[id].author,
      title: booksData[id].title,
      _id: id,
    });
  }

  const context = {
    books,
    deleteHandler,
    updateHandler,
  };

  render(tableRowsTemplate(context), tableBody);
});

function deleteHandler(id) {
  deleteBook(id);

  document.getElementById("loadBooks").click();
}

function updateHandler(id) {
  console.log("updateHandler ...", id);

  // book = request => getBookById(id)
  // display form element (....style.display = 'block')
  // render editFormTemplate(id, book)
}
