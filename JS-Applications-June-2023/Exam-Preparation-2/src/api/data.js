import * as api from "./api.js";

export async function getAllAlbums() {
  return api.get("/data/albums?sortBy=_createdOn%20desc");
}

export async function getAlbumById(id) {
  return api.get("/data/albums/" + id);
}

export async function createAlbum(data) {
  return api.post("/data/albums", data);
}

export async function updateAlbumById(id, data) {
  return api.put("/data/albums/" + id, data);
}

export async function deleteAlbumById(id) {
  return api.del("/data/albums/" + id);
}

export async function likeAlbumById(data) {
  return api.post("/data/likes", data);
}

export async function getAllLikesByAlbumId(albumId) {
  // /data/likes?where= albumId%3D%22{albumId}%22 & distinct=_ownerId & count
  //  /data/likes?where=albumId%3D%22{albumId}%22&distinct=_ownerId&count

  return api.get(
    `/data/likes?where=${encodeURIComponent(
      `albumId="${albumId}"`
    )}&distinct=_ownerId&count`
  );
}

export async function getAllLikesByAlbumIdAndUserId(albumId, userId) {
  // /data/likes?where=albumId%3D%22{albumId}%22%20and%20_ownerId%3D%22{userId}%22&count

  // /data/likes?where=albumId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22%20and%20_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  // /data/likes?where=albumId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22and_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  const url = `/data/likes?where=${encodeURIComponent(
    `albumId="${albumId}"`
  )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;

  console.log(url);

  return api.get(
    `/data/likes?where=${encodeURIComponent(
      `albumId="${albumId}"`
    )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`
  );
}
