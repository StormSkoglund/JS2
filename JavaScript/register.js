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
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    tryCatchError(error.message);
  }
}

//Getting user inputs from forms, Stack Overflow (2012) How do I get the value of text input field using JavaScript? [Online] Available at: 1 (Accessed: 6 February 2024).

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

function preventFormRefresh(event) {
  event.preventDefault();
}
form.addEventListener("submit", getInputs);
form.addEventListener("submit", preventFormRefresh);
//redirect to login page

//if (getInputs.ok) {
//  {
//    window.location.href = "profile/index.html";
//  }
//}
