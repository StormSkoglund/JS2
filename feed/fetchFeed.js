import * as consts from "../JavaScript/modules/consts.mjs";
import { displayContent } from "../JavaScript/modules/displayFunction.mjs";
import { fetchAuthorized } from "../JavaScript/modules/API/fetchContent.mjs";
import { API_BASE_URL } from "../JavaScript/modules/inputs.mjs";
import { endpointsCombined } from "../JavaScript/modules/inputs.mjs";
import { authorEndpoint } from "../JavaScript/modules/inputs.mjs";
import { socialEndpoint } from "../JavaScript/modules/inputs.mjs";
import { postContent } from "../JavaScript/modules/API/post.mjs";
import { tryCatchError } from "../JavaScript/modules/error.mjs";
import { logOut } from "../JavaScript/modules/logOut.mjs";

displayContent(API_BASE_URL + endpointsCombined);

let posts = [];

consts.postBtn.addEventListener("click", postContent);

consts.dropDate.addEventListener("change", async function () {
  //sorting updated post by ascending sort-order
  if (this.value === "1") {
    consts.displayFeed.innerHTML = "";

    displayContent(API_BASE_URL + endpointsCombined);
  } else if (this.value === "2") {
    consts.displayFeed.innerHTML = "";

    displayContent(
      API_BASE_URL +
        "/api/v1/social/posts?_author=true&sort=created&sortOrder=asc"
    );
  }
});

// Search function Demonstrated by Martin Krüger on February 27, 2024. Adapted to suit my API call and content rendering.

async function displayContentFiltered(posts, userInput = "") {
  console.log(userInput);
  try {
    posts = await fetchAuthorized(API_BASE_URL + endpointsCombined);
    consts.displayFeed.innerHTML = "";
    let filteredPosts = posts.filter((post) => {
      if (userInput === "") {
        return true;
      }
      if (post.title.toLowerCase().startsWith(userInput.toLowerCase())) {
        return true;
      }
      return false;
    });
    filteredPosts.forEach((post) => {
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
      let fetchedAvatar = post.author.avatar || consts.DEFAULT_IMAGE_AVATAR_URL;

      let article = document.createElement("article");
      article.className = "card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix";

      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      let singlePostLink = "../feed/single-post/index.html?";

      let postLink = document.createElement("a");
      postLink.href = singlePostLink + "id=" + post.id;
      postLink.className = "stretched-link";
      span1.appendChild(postLink);

      let userImage = document.createElement("img");
      userImage.src = fetchedAvatar;
      userImage.className =
        "rounded-circle img-fluid col-4 col-md-3 border-info img-thumbnail d-block m-auto border-4 border-info opacity-75";
      span1.appendChild(userImage);

      let userName = document.createElement("p");
      userName.textContent = post.author.name;
      userName.className = "fs-6 text-center";
      span1.appendChild(userName);

      let h6 = document.createElement("h6");
      h6.className = "text-center fs-1";
      h6.textContent = post.title;
      span1.appendChild(h6);

      article.appendChild(span1);

      let hr1 = document.createElement("hr");
      hr1.className = "border border-primary border-2 opacity-75";
      span2.appendChild(hr1);

      let div = document.createElement("div");
      let p = document.createElement("p");
      p.className = "fs-5";
      p.textContent = post.body;
      div.appendChild(p);
      span2.appendChild(div);

      let img2 = document.createElement("img");
      img2.className = "col-12 rounded-3 shadow-lg";
      img2.src = fetchedMedia;
      span2.appendChild(img2);

      let span3 = document.createElement("span");
      span3.className = "fs-6 fw-lighter";
      span3.textContent = post.tags;
      span2.appendChild(span3);

      let hr2 = document.createElement("hr");
      hr2.className = "border border-primary border-2 opacity-75";
      span2.appendChild(hr2);

      let span4 = document.createElement("span");
      span4.className = "fs-6 fw-bold d-inline float-right";
      span4.textContent = formatDate;
      span2.appendChild(span4);

      article.appendChild(span2);

      consts.displayFeed.appendChild(article);
    });
  } catch (error) {
    tryCatchError(error);
  }
}

function processSearchInput(event) {
  const userInput = event.currentTarget.value;
  displayContentFiltered(posts, userInput);
}

consts.searchByUserInput.addEventListener("keyup", processSearchInput);

//log-out!

consts.userLogsOut.addEventListener("click", function (event) {
  logOut(event);
});
