import * as consts from "../consts.mjs";
import { API_BASE_URL } from "../inputs.mjs";

/** 
* A function that updates a post, requiring an attached ID;
* // This is a modified version of the put API fetch example, found in JS2 lesson 4;
*
*@param {Event} event - an event triggered by an addEventlistener.
*@throws - Throws any errors will related to the response.
*@returns {Promise} - If the server response evaluates to true, its value will be returned.
*
@example
 * // Choose an HTML element, in this case a form.
 * const form = document.getElementById('updateForm');
 *
 * //To execute the function, you need to attach an event listener.
 * form.addEventListener("submit", updatePost);
 */

export function updatePost(event) {
  event.preventDefault();
  const idValue = consts.id;
  const titleValue = consts.title.value;
  const bodyValue = consts.body.value;
  const imageValue = consts.image.value;
  const tagsValue = consts.tags.value.split(",");

  fetch(API_BASE_URL + "/api/v1/social/posts/" + consts.id, {
    method: "PUT",
    body: JSON.stringify({
      id: `${idValue}`,
      title: `${titleValue}`,
      body: `${bodyValue}`,
      media: `${imageValue}`,
      tags: tagsValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${consts.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("error code " + response.status);
      } else {
        alert("Update succesful!");
        setTimeout(() => {
          window.location.href = "/feed/index.html";
        }, 1200);
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) =>
      alert(
        "An error has occurred. It appears that you are not the author of this post. Please review the error code for further clarification. " +
          error
      )
    );
}
