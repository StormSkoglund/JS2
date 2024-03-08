import {
  API_BASE_URL,
  authorEndpoint,
  socialEndpoint,
} from "../../JavaScript/modules/inputs.mjs";
import * as consts from "../../JavaScript/modules/consts.mjs";
import { displaySinglePost } from "../../JavaScript/modules/displayFunction.mjs";
import { deletePost } from "../../JavaScript/modules/API/deletePosts.mjs";
import { updatePost } from "../../JavaScript/modules/API/updatePosts.mjs";

const form = document.getElementById("formEdit");

console.log(consts.id);

async function fillFormBeforeUpdate() {
  const post = await displaySinglePost(
    API_BASE_URL + socialEndpoint + consts.id + authorEndpoint
  );

  console.log(form);
  form.title.value = post.title;
  form.body.value = post.body;
  form.image.value = post.media;
  form.tags.value = post.tags;

  form.addEventListener("submit", (event) => updatePost(event));
}

updatePost;

fillFormBeforeUpdate();

const removeBtn = document.getElementById("delete");

removeBtn.addEventListener("click", deletePost);
