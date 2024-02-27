import * as consts from "./modules/consts.mjs;";
import { API_BASE_URL } from "./modules/inputs.mjs";
import { delayRefreshPage } from "./modules/norefresh.mjs";

async function fetchAuthorized(url) {
  try {
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${consts.token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    consts.displayFeed.innerHTML = "";
    const posts = json;
    console.log(posts);
    consts.displayFeed.innerHTML = "";

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
      let fetchedMedia = post.media || consts.DEFAULT_IMAGE_URL;
      displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix"><span><img>${post.id}</h5> <img url="${post.avatar}"/>  <h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p>
      <img class="col-12 rounded-3 shadow-lg" src="${fetchedMedia}"><span class="fs-6 fw-lighter"> ${post.tags} </span><hr class="border border-primary border-2 opacity-75"/><span class="fs-6 fw-bold d-inline float-right"> ${formatDate} </span></span> </article>`;
    });

    const dropDate = document.getElementById("dropDown");

    dropDate.addEventListener("change", function () {
      let filterPosts;
      if (this.value === "1") {
        filterPosts = [...posts].sort((a, b) => {
          return new Date(b.created) - new Date(a.created);
        });
      } else if (this.value === "2") {
        filterPosts = [...posts].sort((a, b) => {
          return new Date(a.created) - new Date(b.created);
        });
      }
      displayFeed.innerHTML = "";
      filterPosts.forEach((post) => {
        displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix"><span><img>${post.id}</h5> <img url="${post.avatar}"/>  <h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p>
        <img class="col-12 rounded-3 shadow-lg" src="${post.media}"><span class="fs-6 fw-lighter"> ${post.tags} </span><hr class="border border-primary border-2 opacity-75"/><span class="fs-6 fw-bold d-inline float-right"> ${post.updated} </span></span> </article>`;
      });
    });
  } catch (error) {
    console.log(error);
  }
}

fetchAuthorized(API_BASE_URL + "/api/v1/social/posts");

postBtn.addEventListener("click", postContent);

function postContent() {
  const titleValue = consts.title.value;
  const bodyValue = consts.body.value;
  const imageValue = consts.image.value;
  const tagsValue = consts.tags.value.split(",");
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
