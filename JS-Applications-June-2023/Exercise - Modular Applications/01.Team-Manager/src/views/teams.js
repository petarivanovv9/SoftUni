import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllTeams, getAllTeamMembers } from "../api/data.js";

const teamsTemplate = (user, teams, teamMembersGrouping) => html`
  <section id="browse">
    <article class="pad-med">
      <h1>Team Browser</h1>
    </article>

    ${user
      ? html` <article class="layout narrow">
          <div class="pad-small">
            <a href="#" class="action cta">Create Team</a>
          </div>
        </article>`
      : nothing}
    ${teams.map(
      (team) => html`
        <article class="layout">
          <img src="${team.logoUrl}" class="team-logo left-col" />
          <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details"
              >${teamMembersGrouping[team._id]} Members</span
            >
            <div>
              <a href="/teams/${team._id}" class="action">See details</a>
            </div>
          </div>
        </article>
      `
    )}
  </section>
`;

export async function showTeams(ctx) {
  const teams = await getAllTeams();

  console.log(teams);

  const teamMembers = await getAllTeamMembers();

  const teamMembersGrouping = {};

  teamMembers.forEach(({ teamId }) => {
    if (teamMembersGrouping[teamId]) {
      teamMembersGrouping[teamId] += 1;
    } else {
      teamMembersGrouping[teamId] = 1;
    }
  });

  ctx.render(teamsTemplate(ctx.user, teams, teamMembersGrouping));
}
