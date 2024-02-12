import {
  API_BASE_URL,
  userInputName,
  userMail,
  userPassword,
  form,
} from "./modules/inputs.mjs";

import { tryCatchError } from "./modules/error.mjs";

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    if (!response.ok) {
      throw new Error(
        "Registration failed. The email address and/or account name provided may be registered already."
      );
    }
    if (response.ok) {
      //redirect to login page
      {
        window.location.href = "/index.html";
      }
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    tryCatchError(error.message);
  }
}

//Getting user inputs from forms, Stack Overflow (2012) How do I get the value of text input field using JavaScript? (Accessed: 6 February 2024).

function getInputs() {
  const nameValue = userInputName.value;
  const mailValue = userMail.value;
  const passwordValue = userPassword.value;

  const user = {
    name: `${nameValue}`,
    email: `${mailValue}`,
    password: `${passwordValue}`,
  };
  console.log(user);
  registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);
}
// addEventListener Two Functions (2024) . [Online] available at Stack Overflow https://stackoverflow.com/questions/25028853/addeventlistener-two-functions (Accessed: 12 February 2024).
// how-to-stop-refreshing-the-page-on-submit-in-javascript (2024) [Online] available at Tutorials Point https://www.tutorialspoint.com/how-to-stop-refreshing-the-page-on-submit-in-javascript (Accessed: 12 February 2024).
function preventFormRefresh(event) {
  event.preventDefault();
}
form.addEventListener("submit", getInputs);
form.addEventListener("submit", preventFormRefresh);
