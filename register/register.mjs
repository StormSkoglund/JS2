import {
  API_BASE_URL,
  userInputName,
  userMail,
  userPassword,
  form,
} from "../JavaScript/modules/inputs.mjs";

import { preventFormRefresh } from "../JavaScript/modules/noRefresh.mjs";

import { tryCatchError } from "../JavaScript/modules/error.mjs";

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
    const json = await response.json();
    if (response.ok) {
      //redirect to login page
      {
        alert(
          "Registration successful! You will now be directed to the login page."
        );
        window.location.href = "/index.html";
      }
    }
    if (response.status === 400) {
      throw new Error(
        "Registration failed. The email address and/or account name provided may be registered already."
      );
    } else {
      throw new Error();
    }

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
