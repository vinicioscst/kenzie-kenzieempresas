import { userProfile } from "./requests.js";
import { renderUserInfo } from "./render.js";
import { toast } from "./toast.js";


const approvedColor = "#60d394";

function navigationMenu() {
    const logoutButton = document.querySelector(".button__logout");
  
    logoutButton.addEventListener("click", () => {
        const token = localStorage.clear("kenzieempresas_authToken");
        const isAdm = localStorage.clear("kenzieempresas_isAdm");

        toast(approvedColor, 'Logout realizado com sucesso! Até logo 👋');
        setTimeout(() => { location.href = "./login.html"; }, 3000)
    });
}

async function getUserProfile() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

  const request = await userProfile(token);
  console.log(request)
  renderUserInfo(request);
}

navigationMenu()
getUserProfile();
