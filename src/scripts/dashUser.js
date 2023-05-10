import { userProfile } from "./requests.js";
import { renderUserInfo } from "./render.js";

async function getUserProfile() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

  const request = await userProfile(token);
  console.log(request)
  renderUserInfo(request);
}

getUserProfile();
