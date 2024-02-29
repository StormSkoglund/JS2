import * as consts from "./modules/consts.mjs";
import {
  displayContent,
  displayContentSortOrder,
} from "./modules/display-function.mjs";
import { fetchAuthorized } from "./modules/fetch-content.mjs";
import { API_BASE_URL } from "./modules/inputs.mjs";
import { delayRefreshPage } from "./modules/norefresh.mjs";
import { postContent } from "./modules/post.mjs";

/*async function fetchAuthorized(url) {
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
    posts.forEach((post) => {
      /*I am formatting the date from the API . Available at https://stackoverflow.com/questions/58791663/how-to-modify-date-format-taken-from-wordpress-api[Viewed Nov 17. 2023]. And at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString[Viewed Nov 17. 2023] */ /*
      let formatDate = new Date(post.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    
    //  // using Martin Krügers example with a default image, where there is no media to be fetched.
      let fetchedMedia = post.media || consts.DEFAULT_IMAGE_URL;
      displayContent();
      consts.displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix"><span><img>${post.id}</h5> <img url="${post.avatar}"/>  <h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p>
      <img class="col-12 rounded-3 shadow-lg" src="${fetchedMedia}"><span class="fs-6 fw-lighter"> ${post.tags} </span><hr class="border border-primary border-2 opacity-75"/><span class="fs-6 fw-bold d-inline float-right"> ${formatDate} </span></span> </article>`;
    });*/

/*
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
      consts.displayFeed.innerHTML = "";
      filterPosts.forEach((post) => {
        consts.displayFeed.innerHTML += `<article class="card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix"><span><img>${post.id}</h5> <img url="${post.avatar}"/>  <h6 class="text-center fs-1">${post.title}</h6></span><span><hr class="border border-primary border-2 opacity-75"/><div><p class="fs-5" >${post.body}</p>
        <img class="col-12 rounded-3 shadow-lg" src="${post.media}"><span class="fs-6 fw-lighter"> ${post.tags} </span><hr class="border border-primary border-2 opacity-75"/><span class="fs-6 fw-bold d-inline float-right"> ${post.updated} </span></span> </article>`;
      });
    });
  } catch (error) {
    console.log(error);
  }
}*/

displayContent();

consts.postBtn.addEventListener("click", postContent);

consts.dropDate.addEventListener("change", async function () {
  //sorting updated post by ascending sort-order
  if (this.value === "2") {
    await fetchAuthorized(
      API_BASE_URL +
        "/api/v1/social/posts?_author=true&sort=updated&sortOrder=asc"
    );

    consts.displayFeed.innerHTML = "";

    displayContentSortOrder();
  }
  //let filterPosts;
  //if (this.value === "1") {
  //  filterPosts = [...posts].sort((a, b) => {
  //    return new Date(b.created) - new Date(a.created);
  //  });
  //} else if (this.value === "2") {
  //  filterPosts = [...posts].sort((a, b) => {
  //    return new Date(a.created) - new Date(b.created);
  //  });
  //}
});

/*//Search funtionality
function searchByInput() {
  const searchValue = consts.searchBar.value;

  consts.searchBar.addEventListener("value", display);
}*/
//Update post

//delete post

//View post by ID
