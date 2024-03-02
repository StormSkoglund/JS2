import { fetchAuthorized } from "../../JavaScript/modules/fetch-content.mjs";
import { API_BASE_URL } from "../../JavaScript/modules/inputs.mjs";
import { tryCatchError } from "../../JavaScript/modules/error.mjs";
import { displayContent } from "../../JavaScript/modules/display-function.mjs";
import * as consts from "../../JavaScript/modules/consts.mjs";
import { displaySinglePost } from "../../JavaScript/modules/display-function.mjs";

//Queryparamms to fetch ID
const queryString = document.location.search;

const parameters = new URLSearchParams(queryString);

const id = parameters.get("id");

displaySinglePost(
  API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
);

//find input from form

const titleValue = consts.title.value;
const bodyValue = consts.body.value;
const imageValue = consts.image.value;

function updatePost() {
  fetch(API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true", {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: `${titleValue}`,
      body: `${bodyValue}`,
      media: `${imageValue}`,
      userId: id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
//Listen for click to fire update

consts.postBtn.addEventListener("click", updatePost);
