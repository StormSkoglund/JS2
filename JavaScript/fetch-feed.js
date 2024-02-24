const displayFeed = document.getElementById("feedContainer");
const DEFAULT_IMAGE_URL = "https://picsum.photos/1000";
import { API_BASE_URL } from "./modules/inputs.mjs";
import { delayRefreshPage } from "./modules/norefresh.mjs";
const token = localStorage.getItem("accessToken");

async function fetchAuthorized(url) {
  try {
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    displayFeed.innerHTML = "";
    const posts = json;
    console.log(posts);
    displayFeed.innerHTML = "";

    posts.forEach((post) => {
      /*I am formatting the date from the API . Available at https://stackoverflow.com/questions/58791663/how-to-modify-date-format-taken-from-wordpress-api[Viewed Nov 17. 2023]. And at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString[Viewed Nov 17. 2023] */
      let formatDate = new Date(post.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // using Martin Krügers example with a default image, where there is no media to be fetched.
      let mediaPost = post.media || DEFAULT_IMAGE_URL;
      displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix"><span><img>${post.id}</h5> <img url="${post.avatar}"/>  <h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p>
      <img class="col-12 rounded-3 shadow-lg" src="${mediaPost}"><span class="fs-6 fw-lighter"> ${post.tags} </span><hr class="border border-primary border-2 opacity-75"/><span class="fs-6 fw-bold d-inline float-right"> ${formatDate} </span></span> </article>`;
    });
  } catch (error) {
    console.log(error);
  }
}

fetchAuthorized(API_BASE_URL + "/api/v1/social/posts");

// create post

const title = document.getElementById("title");
const body = document.getElementById("body");
//const postForm = document.getElementById("postForm");
const postBtn = document.getElementById("postButton");
const image = document.getElementById("image");
const tags = document.getElementById("tags");

postBtn.addEventListener("click", postContent);

function postContent() {
  const titleValue = title.value;
  const bodyValue = body.value;
  const imageValue = image.value;
  const tagsValue = tags.value.split(",");
  //I have split the inputs in order to be able to create an array in the post. Developer.mozilla.org. (n.d.). String.prototype.split() - JavaScript | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split (accessed 21-02-2024).

  const deliverPost = {
    method: "POST",
    body: JSON.stringify({
      title: `${titleValue}`,
      body: `${bodyValue}`,
      media: `${imageValue}`,
      tags: tagsValue,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(API_BASE_URL + "/api/v1/social/posts", deliverPost)
    .then((response) => response.json())
    .then((json) => console.log(json));
  if (deliverPost) {
    delayRefreshPage();
  }
}
