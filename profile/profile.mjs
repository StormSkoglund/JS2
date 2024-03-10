import { logOut } from "../JavaScript/modules/logoutUser.mjs";
import { userLogsOut } from "../JavaScript/modules/consts.mjs";

//log-out!

userLogsOut.addEventListener("click", function (event) {
  logOut(event);
});
