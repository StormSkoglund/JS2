import * as consts from "../consts.mjs";
import { API_BASE_URL, socialEndpoint } from "../inputs.mjs";
import { delayRefreshPage } from "../noRefresh.mjs";

export function postContent() {
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
      Authorization: `Bearer ${consts.token}`,
    },
  };

  fetch(API_BASE_URL + socialEndpoint, deliverPost)
    .then((response) => response.json())
    .then((json) => console.log(json));
  if (deliverPost) {
    delayRefreshPage();
  }
}
