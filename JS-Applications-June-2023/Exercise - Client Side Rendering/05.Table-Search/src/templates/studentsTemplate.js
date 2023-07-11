import { html } from "../../node_modules/lit-html/lit-html.js";

// studentsData = [{}, {}]
export const studentsTemplate = (studentsData) => html`
  ${studentsData.map((student) => rowTemplate(student))}
`;

const rowTemplate = (student) => html`
  <tr>
    <td>${student.firstName} ${student.lastName}</td>
    <td>${student.email}</td>
    <td>${student.course}</td>
  </tr>
`;
