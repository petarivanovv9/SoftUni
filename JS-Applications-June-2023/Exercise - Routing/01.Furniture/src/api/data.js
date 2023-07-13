import * as api from "./api.js";

const endpoints = {
  allFurniture: "/data/catalog",
  furnitureById: "/data/catalog/",
  updateFurniture: "/data/catalog/",
  deleteFurniture: "/data/catalog/",
};

export async function getAllFurniture() {
  return api.get(endpoints.allFurniture);
}

export async function getFurnitureById(id) {
  return api.get(endpoints.furnitureById + id);
}

export async function updateFurniture(id, data) {
  return api.put(endpoints.updateFurniture + id, data);
}

export async function deleteFurniture(id) {
  return api.del(endpoints.deleteFurniture + id);
}
