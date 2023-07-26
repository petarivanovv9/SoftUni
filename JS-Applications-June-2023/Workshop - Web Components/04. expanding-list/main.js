class ExpandingList extends HTMLUListElement {
  constructor() {
    self = super(); // reference to our elem (ul)

    // 1. get ul & li elements of super

    const uls = Array.from(self.querySelectorAll("ul"));
    const lis = Array.from(self.querySelectorAll("li"));

    // 2. hide all child uls

    uls.forEach((ul) => (ul.style.display = "none"));

    // 3. look through each li elem in the ul
    // 3.1 add class .closed
    // 3.2 create <li></li> + attach event listener

    lis.forEach((li) => {
      if (li.querySelectorAll("ul").length > 0) {
        li.setAttribute("class", "closed");

        // <li>
        //   <span onclick>TEXT</span>
        //   <ul></ul>
        // </li>
        // <li></li>

        const childText = li.childNodes[0];

        const newSpan = document.createElement("span");

        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        newSpan.onclick = self.showul;

        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
      }
    });

    // 4. add showUL handler
  }

  showul(event) {
    console.log("here");

    console.log(event.target);
    console.log(event.target.nextElementSibling);
    // console.log(event.target.nextElementSibling.querySelectorAll("ul")[0]);

    const nextul = event.target.nextElementSibling;

    if (nextul.style.display === "block") {
      nextul.style.display = "none";
      nextul.parentNode.setAttribute("class", "closed");
    } else {
      nextul.style.display = "block";
      nextul.parentNode.setAttribute("class", "open");
    }
  }
}

customElements.define("expanding-list", ExpandingList, { extends: "ul" });
