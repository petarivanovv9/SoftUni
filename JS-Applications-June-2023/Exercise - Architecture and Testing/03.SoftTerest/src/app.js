// Views/Pages
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showDetails } from "./views/details.js";
import { showCreate } from "./views/create.js";

// Router
import { initialize } from "./router.js";

document.getElementById("views").remove();

// routes configuration
const routes = {
  "/": showHome,
  "/register": showRegister,
  "/login": showLogin,
  "/catalog": showCatalog,
  "/details": showDetails,
  "/create": showCreate,
};

const router = initialize(routes);

router.goTo("/");

router.updateNav();
