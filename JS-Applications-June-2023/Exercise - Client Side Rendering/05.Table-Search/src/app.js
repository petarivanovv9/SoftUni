import { render } from "../node_modules/lit-html/lit-html.js";
import { getAllStudents } from "./api.js";
import { studentsTemplate } from "./templates/studentsTemplate.js";
import { onSearch } from "./search.js";

const tableBody = document.querySelector(".container tbody");

const studentsData = await getAllStudents();

render(studentsTemplate(Object.values(studentsData)), tableBody);

const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", onSearch);
