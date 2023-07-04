import { detailsPage } from "./details.js";
import { showView } from "./utils.js";

const section = document.getElementById("edit-movie");

const form = section.querySelector("form");

export async function editPage(id) {
  console.log("...editPage...", id);

  // Steps:
  // 1. show/hide HTML content
  // 2. get movie's data by id through a request
  // 3. "edit request"
  // - get forms data
  // - form validation?!?
  // - error handling?!?
  // 4. navigate to homepage

  showView(section);

  const res = await fetch(`http://localhost:3030/data/movies/${id}`);
  const movie = await res.json();

  section.querySelector('[name="title"]').value = movie.title;
  section.querySelector('[name="description"]').value = movie.description;
  section.querySelector('[name="img"]').value = movie.img;

  form.setAttribute("id", id);

  form.addEventListener("submit", onEditMovie);
}

async function onEditMovie(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");

  const movieId = event.target.id;

  if (title !== "" && description !== "" && img !== "") {
    const user = JSON.parse(sessionStorage.getItem("user"));

    try {
      const response = await fetch(
        `http://localhost:3030/data/movies/${movieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": user.accessToken,
          },
          body: JSON.stringify({ title, description, img }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      alert(err.message);
    }

    detailsPage(movieId);
  }
}
