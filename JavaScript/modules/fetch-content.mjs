import * as consts from "./consts.mjs";

export async function fetchAuthorized(url) {
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
    return posts;
  } catch (error) {
    console.log(error);
  }
}
