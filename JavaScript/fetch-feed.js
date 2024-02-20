const displayFeed = document.getElementById("feedContainer");

import { API_BASE_URL } from "./modules/inputs.mjs";

async function fetchAuthorized(url) {
  try {
    const token = localStorage.getItem("accessToken");
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

    posts.forEach((post) => {
      displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light"><span><h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p><img class="col-12 rounded-3 shadow-lg" src="${post.media}"><p class="fs-6 fw-lighter"> ${post.tags} </p></span> </article>`;
      //const postImage = document.createElement("img");
      //postImage.className = "col-12 border border-info border-3";
      //postImage.src = post.media;
      //postImage.alt = post.title;
      //displayFeed.append(postImage);
    });
  } catch (error) {
    console.log(error);
  }
}

// append posts

fetchAuthorized(API_BASE_URL + "/api/v1/social/posts");
