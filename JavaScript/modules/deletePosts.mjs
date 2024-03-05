import { preventFormRefresh } from "./norefresh.mjs";

async function deletePost(id, url, event) {
  preventFormRefresh(event);
  try {
    id = id;
    const getData = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${consts.token}`,
      },
    };
    const response = await fetch(url, id, getData);
    console.log(response);
  } catch (error) {
    tryCatchError(error);
  }
}
