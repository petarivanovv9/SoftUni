import * as api from "./api.js";

const endpoints = {
  ideas: "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
  ideasById: "/data/ideas/",
};

export async function getAllIdeas() {
  return api.get(endpoints.ideas);
}

export async function getIdeaById(id) {
  return api.get(endpoints.ideasById + id);
}
