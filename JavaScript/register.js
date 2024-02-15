import {
  API_BASE_URL,
  userInputName,
  userMail,
  userPassword,
  form,
} from "./modules/inputs.mjs";

import { preventFormRefresh } from "./modules/norefresh.mjs";

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
    if (response.ok) {
      //redirect to login page
      {
        window.location.href = "/index.html";
      }
    } else {
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

//Getting user inputs from forms, Stack Overflow (2012) How do I get the value of text input field using JavaScript? [online] available at: https://stackoverflow.com/questions/11563638/how-do-i-get-the-value-of-text-input-field-using-javascript (Accessed: 6 February 2024).

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

form.addEventListener("submit", getInputs);
form.addEventListener("submit", preventFormRefresh);
