import { homeView } from "./home.js";
import { updateNav } from "./util.js";

export async function logout() {
    localStorage.removeItem('user');

    updateNav();
    homeView();
}