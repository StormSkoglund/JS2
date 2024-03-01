import { fetchAuthorized } from "../../JavaScript/modules/fetch-content.mjs";
import { API_BASE_URL } from "../../JavaScript/modules/inputs.mjs";
import { tryCatchError } from "../../JavaScript/modules/error.mjs";

//Queryparamms to fetch ID
const queryString = document.location.search;

const parameters = new URLSearchParams(queryString);

const id = parameters.get("id");

async function displaySinglePost() {
  const post = await fetchAuthorized(
    API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true"
  );

  if (!post) {
    console.log("Problems with API");
  }

  try {
    if (post) {
      let fetchedMedia = post.media || consts.DEFAULT_IMAGE_URL;
      let fetchedAvatar = post.author.avatar || consts.DEFAULT_IMAGE_URL;
      let postContainer = document.querySelector("single-post");
      let article = document.createElement("article");
      article.className = "card m-2 p-3 mt-4 mb-4 box-shadow-light clearfix";

      let span1 = document.createElement("span");
      let span2 = document.createElement("span");

      let userImage = document.createElement("img");
      userImage.src = fetchedAvatar;
      userImage.className =
        "rounded-circle img-fluid col-4 col-md-4 border-info img-thumbnail d-block m-auto border-4 border-info opacity-75";
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

      postContainer.appendChild(article);
    } else {
      alert("Post not recognised.");
    }
  } catch (error) {
    tryCatchError();
    console.log(error);
  }
}

displaySinglePost();
