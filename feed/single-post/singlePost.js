import {
  API_BASE_URL,
  authorEndpoint,
  socialEndpoint,
} from "../../JavaScript/modules/inputs.mjs";
import * as consts from "../../JavaScript/modules/consts.mjs";
import { displaySinglePost } from "../../JavaScript/modules/displayFunction.mjs";
import { deletePost } from "../../JavaScript/modules/API/deletePosts.mjs";
import { updatePost } from "../../JavaScript/modules/API/updatePosts.mjs";
import { logOut } from "../../JavaScript/modules/logoutUser.mjs";

const form = document.getElementById("formEdit");

async function fillFormBeforeUpdate() {
  const post = await displaySinglePost(
    API_BASE_URL + socialEndpoint + consts.id + authorEndpoint
  );
  const userId = localStorage.getItem("userProfile");

  const formattedUserId = JSON.parse(userId);

  const userMailId = formattedUserId.userMail;

  if (userMailId !== post.author.email) {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }

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

//log-out!

consts.userLogsOut.addEventListener("click", function (event) {
  logOut(event);
});
