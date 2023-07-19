import * as api from "./api.js";

const endpoints = {
  allTeams: "/data/teams",
  allTeamMembers: "/data/members",
  teamById: "/data/teams/",
  teamMembersByTeamId: (id) =>
    `/data/members?where=${encodeURIComponent(
      `teamId="${id}"`
    )}&load=user%3D_ownerId%3Ausers`,
  deleteTeamMemberById: "/data/members/",
};

export async function getAllTeams() {
  return api.get(endpoints.allTeams);
}

export async function getAllTeamMembers() {
  return api.get(endpoints.allTeamMembers);
}

export async function getTeamById(id) {
  return api.get(endpoints.teamById + id);
}

export async function getTeamMembersByTeamId(id) {
  return api.get(endpoints.teamMembersByTeamId(id));
}

export async function deleteTeamMemberById(id) {
  return api.del(endpoints.deleteTeamMemberById + id);
}
