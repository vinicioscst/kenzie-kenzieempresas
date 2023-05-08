import { allCompanies, allDepartments } from "./requests.js";
import { renderCompaniesList, renderDepartmentsList } from "./render.js";

function navigationMenu() {
  const loginButton = document.querySelector(".button__login");
  const registerButton = document.querySelector(".button__register");

  loginButton.addEventListener("click", () => {
    location.href = "./src/pages/login.html";
  });

  registerButton.addEventListener("click", () => {
    location.href = "./src/pages/register.html";
  });
}

navigationMenu();
