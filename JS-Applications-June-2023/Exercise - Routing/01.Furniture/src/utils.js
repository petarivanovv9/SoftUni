export function updateNav() {
  const userNav = document.getElementById("user");
  const guestNav = document.getElementById("guest");

  if (sessionStorage.getItem("user")) {
    userNav.style.display = "inline";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline";
  }
}
