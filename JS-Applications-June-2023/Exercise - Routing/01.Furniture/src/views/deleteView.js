import page from "../../node_modules/page/page.mjs";

import { deleteFurniture } from "../api/data.js";

export function onDelete(event) {
  console.log("...delete ... onClick...", event.target.id);

  const confirmation = confirm("Are you sure?");

  const id = event.target.id;

  if (confirmation) {
    deleteFurniture(id);

    page.redirect("/");
  }
}
