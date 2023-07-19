import page from "../node_modules/page/page.mjs";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showTeams } from "./views/teams.js";
import { getUserData } from "./utils.js";
import { showDetails } from "./views/details.js";

const navTemplate = (user) => html`
  <a href="/teams" class="action">Browse Teams</a>
  ${user
    ? html`
        <a href="#" class="action">My Teams</a>
        <a href="#" class="action">Logout</a>
      `
    : html`
        <a href="/login" class="action">Login</a>
        <a href="#" class="action">Register</a>
      `}
`;

function updateNav(ctx, next) {
  render(navTemplate(ctx.user), document.querySelector("nav"));

  next();
}

function session(ctx, next) {
  const user = getUserData();

  if (user) {
    ctx.user = user;
  }

  next();
}

// BEFORE
// render(template, document.querySelector("body div.container"));
// render(template, container)

// AFTER
// >>> render(template)
// usage: ctx.render(template / content)

function decorateContext(ctx, next) {
  ctx.render = function (content) {
    render(content, document.querySelector("main"));
  };

  next();
}

page(session);
page(decorateContext);
page(updateNav);

page("/", showHome);
page("/teams", showTeams);
page("/teams/:id", showDetails);

page("/login", showLogin);

page.start();
