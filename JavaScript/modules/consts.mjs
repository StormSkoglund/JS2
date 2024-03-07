export const token = localStorage.getItem("accessToken");
export const title = document.getElementById("title");
export const body = document.getElementById("body");
export const postBtn = document.getElementById("postButton");
export const updateBtn = document.getElementById("updateBtn");
export const image = document.getElementById("image");
export const tags = document.getElementById("tags");
export const displayFeed = document.getElementById("feedContainer");
export const DEFAULT_IMAGE_URL = "https://picsum.photos/1000";
export const DEFAULT_IMAGE_AVATAR_URL =
  "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1709563197~exp=1709566797~hmac=b689e5e177c3d6c62da590cd067d75d9ba4e97609d314b94de53d37a913bf5a5&w=740";
export const searchByUserInput = document.getElementById("search");
export const dropDate = document.getElementById("dropDown");
//Query params to fetch ID
export const queryString = document.location.search;
export const parameters = new URLSearchParams(queryString);
export const id = parameters.get("id");
