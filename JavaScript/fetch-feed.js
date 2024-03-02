import * as consts from "./modules/consts.mjs";
import { displayContent } from "./modules/display-function.mjs";
import { fetchAuthorized } from "./modules/fetch-content.mjs";
import { API_BASE_URL } from "./modules/inputs.mjs";
import { delayRefreshPage } from "./modules/norefresh.mjs";
import { postContent } from "./modules/post.mjs";

displayContent(API_BASE_URL + "/api/v1/social/posts?_author=true");

consts.postBtn.addEventListener("click", postContent);

consts.dropDate.addEventListener("change", async function () {
  //sorting updated post by ascending sort-order
  if (this.value === "1") {
    consts.displayFeed.innerHTML = "";

    displayContent(API_BASE_URL + "/api/v1/social/posts?_author=true");
  } else if (this.value === "2") {
    consts.displayFeed.innerHTML = "";

    displayContent(
      API_BASE_URL +
        "/api/v1/social/posts?_author=true&sort=created&sortOrder=asc"
    );
  }
});

//Search funtionality
//async function searchByInput() {
//  let posts = await fetchAuthorized();
//  const searchValue = consts.searchBar.value;
//  console.log(searchValue);
//}

//consts.searchBar.addEventListener("value", searchByInput);

//Update post

//delete post

//View post by ID
