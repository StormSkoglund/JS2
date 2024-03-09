import { logOut } from "../JavaScript/modules/logOut.mjs";
import { userLogsOut } from "../JavaScript/modules/consts.mjs";

//log-out!

userLogsOut.addEventListener("click", function (event) {
  logOut(event);
});
