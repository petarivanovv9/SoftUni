import { homeView } from "./home.js";
import { updateNav,displayView } from "./util.js";

// export async function logout() {
//     localStorage.removeItem('user');

//     updateNav();
//     homeView();
// }
const loginSection = document.querySelector('#form-login')

export async function logout() {
    const url = 'http://localhost:3030/users/logout';
    const user = JSON.parse(localStorage.getItem('user'))
    const options = {
        method: "GET",
        headers: { "X-Authorization": user.accessToken }
    }
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error("Failed to logout");
        }
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')

        updateNav()
        displayView(loginSection)
    } catch (err) {
        alert(err)

    }

    //   fetch(url,options).then(response=> {
    //       if(response.status != 204) {
    //           throw new Error("Failed to logout");
    //       }

    //       sessionStorage.clear();
    //      updateNavigation()
    //      window.location.href="/"
    //   }).catch(err => {
    //       alert(err);
    //   })

}