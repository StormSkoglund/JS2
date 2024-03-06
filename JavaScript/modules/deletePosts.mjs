import { tryCatchError } from "./error.mjs";
import { preventFormRefresh } from "./noRefresh.mjs";
import * as consts from "./consts.mjs";
import { API_BASE_URL } from "./inputs.mjs";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const id = parameters.get("id");

export async function deletePost(url, event) {
  try {
    const getData = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${consts.token}`,
      },
    };
    const response = await fetch(
      API_BASE_URL + "/api/v1/social/posts/" + id + "?_author=true",
      getData
    );
    if (response.ok) {
      alert("Post has been deleted");
      setTimeout(() => {
        window.location.href = "/feed/index.html";
      }, 1200);
    } else {
      alert("You can't delete other users post!");
    }
    console.log(response);
  } catch (error) {
    tryCatchError(error);
  }
}
