// entry point for the whole app

import page from "../node_modules/page/page.mjs";
import { catalogView } from "./views/catalogView.js";
import { detailsView } from "./views/detailsView.js";
import { loginView } from "./views/loginView.js";
import { updateNav } from "./utils.js";
import { editView } from "./views/editView.js";

console.log("hello");

updateNav();

page("/", catalogView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page.start();
