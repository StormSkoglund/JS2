//URL and its endpoints
export const API_BASE_URL = "https://api.noroff.dev";
export const socialEndpoint = "/api/v1/social/posts/";
export const authorEndpoint = "?_author=true";
export const endpointsCombined = "/api/v1/social/posts?_author=true";
export const endpointsCombinedAscending =
  "/api/v1/social/posts?_author=true&sort=created&sortOrder=asc";

//User inputs
export const userInputName = document.getElementById("userName");
export const userMail = document.getElementById("inputMail");
export const userPassword = document.getElementById("inputPass");
export const formBtn = document.getElementById("formButton");
export const form = document.getElementById("form");
