import { render, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { getFurnitureById, updateFurniture } from "../api/data.js";

const editTemplate = (furniture) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Edit Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit="${onSubmit}" id="${furniture._id}">
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class="form-control"
            id="new-make"
            type="text"
            name="make"
            value="${furniture.make}"
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control"
            id="new-model"
            type="text"
            name="model"
            value="${furniture.model}"
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control"
            id="new-year"
            type="number"
            name="year"
            value="${furniture.year}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
            value="${furniture.description}"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
            value="${furniture.price}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input
            class="form-control"
            id="new-image"
            type="text"
            name="img"
            value="${furniture.img}"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
            value="${furniture.material}"
          />
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
      </div>
    </div>
  </form>
`;

export async function editView(context) {
  console.log("...editView...", context);

  const id = context.params.id;

  const data = await getFurnitureById(id);

  render(editTemplate(data), document.querySelector("body div.container"));
}

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const make = formData.get("make");
  const price = formData.get("price");
  const model = formData.get("model");
  const year = formData.get("year");
  const material = formData.get("material");
  const description = formData.get("description");
  const img = formData.get("img");

  const id = document.querySelector("form").id;

  let isFormValid = true;

  const newModelElem = document.getElementById("new-model");
  const newPriceElem = document.getElementById("new-price");
  const newMakeElem = document.getElementById("new-make");
  const newYearElem = document.getElementById("new-year");
  const newMaterialElem = document.getElementById("new-material");
  const newDescriptionElem = document.getElementById("new-description");
  const newImgElem = document.getElementById("new-image");

  model.length >= 4
    ? validate(newModelElem, true)
    : validate(newModelElem, false);
  make.length >= 4 ? validate(newMakeElem, true) : validate(newMakeElem, false);
  Number(price) > 0
    ? validate(newPriceElem, true)
    : validate(newPriceElem, false);
  description.length >= 10
    ? validate(newDescriptionElem, true)
    : validate(newDescriptionElem, false);
  img !== "" ? validate(newImgElem, true) : validate(newImgElem, false);
  Number(year) >= 1950 && Number(year) <= 2050
    ? validate(newYearElem, true)
    : validate(newYearElem, false);

  // field validation
  // if true => add class `is-valid`
  // if false => add class `is-invalid` + isFormValid = false

  function validate(element, boolean) {
    if (boolean) {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
    } else {
      isFormValid = false;

      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
    }
  }

  if (isFormValid) {
    const data = { make, price, model, year, material, description, img };

    updateFurniture(id, data);

    page.redirect("/");
  }
}
