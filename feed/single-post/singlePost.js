import { fetchAuthorized } from "../../JavaScript/modules/fetchContent.mjs";
import { API_BASE_URL } from "../../JavaScript/modules/inputs.mjs";
import { tryCatchError } from "../../JavaScript/modules/error.mjs";
import { displayContent } from "../../JavaScript/modules/displayFunction.mjs";
import * as consts from "../../JavaScript/modules/consts.mjs";
import { displaySinglePost } from "../../JavaScript/modules/displayFunction.mjs";
import { preventFormRefresh } from "../../JavaScript/modules/noRefresh.mjs";
import { deletePost } from "../../JavaScript/modules/deletePosts.mjs";

//Query params to fetch ID
const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");
const form = document.getElementById("formEdit");

console.log(id);

async function fillFormBeforeUpdate() {
  const post = await displaySinglePost(
    API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
  );

  console.log(form);
  form.title.value = post.title;
  form.body.value = post.body;
  form.image.value = post.media;
  form.tags.value = post.tags;

  form.addEventListener("submit", (event) => updatePost(event));
}
//Modified version of the put API fetch example, found in JS2 lesson 4.
function updatePost(event) {
  event.preventDefault();
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
    .then((response) => {
      if (!response.ok) {
        throw new Error("error code " + response.status);
      } else {
        alert("Update succesful!");
        setTimeout(() => {
          window.location.href = "/feed/index.html";
        }, 1200);
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) =>
      alert(
        "An error has occurred. It appears that you are not the author of this post. Please review the error code for further clarification. " +
          error
      )
    );
}

fillFormBeforeUpdate();

const removeBtn = document.getElementById("delete");

removeBtn.addEventListener("click", deletePost);
