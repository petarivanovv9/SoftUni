import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAlbum } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export function showCreate(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (
      !data.singer ||
      !data.album ||
      !data.release ||
      !data.imageUrl ||
      !data.label ||
      !data.sales
    ) {
      return;
    }

    try {
      await createAlbum(data);

      ctx.page.redirect("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  }
}
