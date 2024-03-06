import {
  API_BASE_URL,
  userInputName,
  userMail,
  userPassword,
  form,
} from "./modules/inputs.mjs";

import { tryCatchError } from "./modules/error.mjs";

import { preventFormRefresh } from "./modules/noRefresh.mjs";

async function loginUser(url, data) {
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
      window.location.href = "/feed/index.html";
    } else {
      throw new Error("User does not exist.");
    }
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        userInputname: json.name,
        userMail: json.email,
      })
    );

    console.log(json);
    return json;
  } catch (error) {
    tryCatchError(error.message);
  }
}

function login() {
  const nameValue = userInputName.value;
  const mailValue = userMail.value;
  const passwordValue = userPassword.value;

  const user = {
    name: `${nameValue}`,
    email: `${mailValue}`,
    password: `${passwordValue}`,
  };
  console.log(user);
  loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
}

form.addEventListener("submit", login);
form.addEventListener("submit", preventFormRefresh);
