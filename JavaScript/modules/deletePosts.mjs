import { preventFormRefresh } from "./norefresh.mjs";

async function deletePost(id, url, event) {
  preventFormRefresh(event);
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
  } catch (error) {
    tryCatchError(error);
  }
}
