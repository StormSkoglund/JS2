import { fetchAuthorized } from "../../JavaScript/modules/fetch-content.mjs";
import { API_BASE_URL } from "../../JavaScript/modules/inputs.mjs";
import { tryCatchError } from "../../JavaScript/modules/error.mjs";
import { displayContent } from "../../JavaScript/modules/display-function.mjs";
import * as consts from "../../JavaScript/modules/consts.mjs";
import { displaySinglePost } from "../../JavaScript/modules/display-function.mjs";
import { preventFormRefresh } from "../../JavaScript/modules/norefresh.mjs";

//Queryparamms to fetch ID
const queryString = document.location.search;

const parameters = new URLSearchParams(queryString);

const id = parameters.get("id");
/*
displaySinglePost(
  API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
);

//Fill form with input from selected post

const form = document.getElementById("formEdit");

if (form) {
  displaySinglePost(
    API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
  );
  form.title.value = consts.post.title;
  form.body.value = consts.post.body;
  form.image.value = consts.post.image;
  form.tags.value = consts.post.tags;

  //find input from form

  const titleValue = consts.title.value;
  const bodyValue = consts.body.value;
  const imageValue = consts.image.value;
  const tagsValue = consts.tags.value.split(",");

  consts.postBtn.addEventListener("click", updatePost);
}

function updatePost() {
  fetch(API_BASE_URL + "/api/v1/social/posts/" + id, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: `${titleValue}`,
      body: `${bodyValue}`,
      media: `${imageValue}`,
      tags: tagsValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${consts.token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
//Listen for click to fire update
*/
const form = document.getElementById("formEdit");
async function fillFormAndSetupUpdate() {
  const post = await displaySinglePost(
    API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
  );

  if (form) {
    console.log(form);
    form.title.value = post.title;
    form.body.value = post.body;
    form.image.value = post.media;
    form.tags.value = post.tags;

    form.addEventListener("submit", () => updatePost(post));
  }
}

function updatePost(post) {
  Event.preventDefault();
  const idValue = id;
  const titleValue = consts.title.value;
  const bodyValue = consts.body.value;
  const imageValue = consts.image.value;
  const tagsValue = consts.tags.value.split(",");

  fetch(API_BASE_URL + "/api/v1/social/posts/" + id, {
    method: "PUT",
    body: JSON.stringify({
      id: `${idValue}`,
      title: `${titleValue}`,
      body: `${bodyValue}`,
      media: `${imageValue}`,
      tags: tagsValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${consts.token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

fillFormAndSetupUpdate();
