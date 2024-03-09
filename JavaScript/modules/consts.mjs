export const token = localStorage.getItem("accessToken");
export const title = document.getElementById("title");
export const body = document.getElementById("body");
export const postBtn = document.getElementById("postButton");
export const updateBtn = document.getElementById("updateBtn");
export const image = document.getElementById("image");
export const tags = document.getElementById("tags");
export const displayFeed = document.getElementById("feedContainer");
export const DEFAULT_IMAGE_URL = "https://picsum.photos/1000";
export const DEFAULT_IMAGE_AVATAR_URL = "/images/Avatar_default.png";
export const searchByUserInput = document.getElementById("search");
export const dropDate = document.getElementById("dropDown");
//Query params to fetch ID
export const queryString = document.location.search;
export const parameters = new URLSearchParams(queryString);
export const id = parameters.get("id");
export const userLogsOut = document.querySelector(".log-out");
