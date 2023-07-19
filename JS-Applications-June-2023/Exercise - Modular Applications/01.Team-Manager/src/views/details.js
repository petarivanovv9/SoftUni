import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { until } from "../../node_modules/lit-html/directives/until.js";
import {
  deleteTeamMemberById,
  getTeamById,
  getTeamMembersByTeamId,
} from "../api/data.js";

const asyncTemplate = (teamPromise) =>
  html`${until(teamPromise, html`<p>Loading...</p>`)}`;

const detailsTemplate = (user, team, teamMembers, onDelete) => {
  const isOwner = user._id === team._ownerId;

  const isMember = teamMembers.find((tm) => tm.user._id === user._id);

  const isUserMember = (userId) =>
    teamMembers.find((tm) => tm.user._id === userId);

  return html` <section id="team-home">
    <article class="layout">
      <p>${JSON.stringify(teamMembers)}</p>
      <img src="./assets/rocket.png" class="team-logo left-col" />
      <div class="tm-preview">
        <h2>Team ${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${teamMembers.length} Members</span>
        <div>
          ${isOwner ? html`<a href="#" class="action">Edit team</a>` : nothing}
          ${!isMember && html`<a href="#" class="action">Join team</a>`}
          ${!isMember &&
          !isOwner &&
          html`<a href="#" class="action invert">Leave team</a>`}
          Membership pending. <a href="#">Cancel request</a>
        </div>
      </div>
      <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
          <li>My Username</li>
          ${teamMembers.map(
            (tm) => html`
              <li>
                ${tm.user.username}
                ${isOwner &&
                html`<a
                  href="#"
                  class="tm-control action"
                  @click=${onDelete}
                  id="${tm._id}"
                  >Remove from team</a
                >`}
              </li>
            `
          )}
        </ul>
      </div>
      <div class="pad-large">
        <h3>Membership Requests</h3>
        <ul class="tm-members">
          ${teamMembers.map(
            (tm) => html`
              <li>
                ${tm.user.username}<a href="#" class="tm-control action"
                  >Approve</a
                ><a href="#" class="tm-control action">Decline</a>
              </li>
            `
          )}
        </ul>
      </div>
    </article>
  </section>`;
};

export async function showDetails(ctx) {
  const id = ctx.params.id;

  ctx.render(asyncTemplate(loadTeam(id, ctx.user, onDelete)));

  async function onDelete(event) {
    const teamMemberId = event.target.id;

    await deleteTeamMemberById(teamMemberId);

    ctx.page.redirect("/teams/" + id);
  }
}

async function loadTeam(id, user, onDelete) {
  const [team, teamMembers] = await Promise.all([
    getTeamById(id),
    getTeamMembersByTeamId(id),
  ]);

  console.log(teamMembers);

  return detailsTemplate(user, team, teamMembers, onDelete);
}
