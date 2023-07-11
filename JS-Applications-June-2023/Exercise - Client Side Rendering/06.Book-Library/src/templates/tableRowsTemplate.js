import { html } from "../../node_modules/lit-html/lit-html.js";

export const tableRowsTemplate = (context) => html`
  ${context.books.map((book) =>
    rowTemplate(book, context.deleteHandler, context.updateHandler)
  )}
`;

const rowTemplate = (book, deleteHandler, updateHandler) => html`
  <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button @click=${updateHandler.bind(null, book._id)}>Edit</button>
      <button @click=${deleteHandler.bind(null, book._id)}>Delete</button>
    </td>
  </tr>
`;
