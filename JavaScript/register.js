import {
  API_BASE_URL,
  userInputName,
  userMail,
  userPassword,
  formBtn,
} from "./modules/inputs.mjs";

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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
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

formBtn.addEventListener("click", getInputs);
