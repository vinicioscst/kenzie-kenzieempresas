import { userProfile } from "./requests.js";
import { renderUserInfo } from "./render.js";
import { toast } from "./toast.js";

const approvedColor = "#60d394";

function authentication() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
  const isAdm = JSON.parse(localStorage.getItem("kenzieempresas_isAdm"));

  if(token && isAdm === true) {
    location.replace('./dashAdmin.html')
  } else if(!token) {
    location.replace('./login.html')
  } 
}

function navigationMenu() {
    const logoutButton = document.querySelector(".button__logout");
  
    logoutButton.addEventListener("click", () => {
        const token = localStorage.clear("kenzieempresas_authToken");
        const isAdm = localStorage.clear("kenzieempresas_isAdm");

        toast(approvedColor, 'Logout realizado com sucesso! Até logo 👋');
        setTimeout(() => { location.href = "./login.html"; }, 2000)
    });
}

async function getUserProfile() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

  const request = await userProfile(token);
  console.log(request)
  renderUserInfo(request);
}

authentication()
navigationMenu()
getUserProfile();
