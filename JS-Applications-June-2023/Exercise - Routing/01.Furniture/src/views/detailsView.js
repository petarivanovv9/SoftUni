import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { getFurnitureById } from "../api/data.js";
import { onDelete } from "./deleteView.js";

const detailsTemplate = (furniture) => {
  // const isFurnitureOwner =
  //   JSON.parse(sessionStorage.getItem("user")) &&
  //   furniture._ownerId === JSON.parse(sessionStorage.getItem("user"))._id;

  const isFurnitureOwner =
    furniture._ownerId === JSON.parse(sessionStorage.getItem("user"))?._id;

  return html`
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src="../../${furniture.img}" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div>
          ${isFurnitureOwner
            ? html`<a href="/edit/${furniture._id}" class="btn btn-info"
                >Edit</a
              >`
            : null}
          ${isFurnitureOwner
            ? html`<a
                href="javascript:void(0)"
                class="btn btn-red"
                id="${furniture._id}"
                >Delete</a
              >`
            : null}
        </div>
      </div>
    </div>
  `;
};

export async function detailsView(context) {
  const id = context.params.id;

  const data = await getFurnitureById(id);

  render(detailsTemplate(data), document.querySelector("body div.container"));

  document.querySelector(".btn-red").addEventListener("click", onDelete);
}
