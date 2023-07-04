import { homePage } from "./home.js";
import { showView, updateNavBar } from "./utils.js";

const section = document.getElementById("form-login");

const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

export function loginPage() {
  console.log("...loginPage...");

  // TODO:
  // -> show/hide HTML content
  // -> display login form

  showView(section);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  // reset form -> all input fields should be empty
  // update navigation section
  // update "main section"

  await login(email, password);

  form.reset();
  updateNavBar();
  homePage();
}

async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const user = await res.json();

    sessionStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    alert(err.message);
  }
}
