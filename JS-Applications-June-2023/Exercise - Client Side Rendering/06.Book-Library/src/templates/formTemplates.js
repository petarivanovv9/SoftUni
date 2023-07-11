import { html } from "../../node_modules/lit-html/lit-html.js";

export const addFormTemplate = () => html`
  <h3>Add book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." />
  <input type="submit" value="Submit" />
`;

//
// editFormTemplate(id, book)
//
export const editFormTemplate = (id, book) => html`
  <input type="hidden" name="id" value="${id}" />
  <h3>Edit book</h3>
  <label>TITLE</label>
  <input
    type="text"
    name="title"
    placeholder="Title..."
    value="${book.title}"
  />
  <label>AUTHOR</label>
  <input
    type="text"
    name="author"
    placeholder="Author..."
    value="${book.author}"
  />
  <input type="submit" value="Save" />
`;
