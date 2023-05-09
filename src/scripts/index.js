import { getAllCategories, getAllCompanies, getCompaniesByName, } from "./requests.js";
import { renderCategoriesList, renderCompaniesList } from "./render.js";

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

async function renderCategoriesAndCompanies() {
  const requestCategories = await getAllCategories();
  const requestCompanies = await getAllCompanies();

  renderCategoriesList(requestCategories);
  renderCompaniesList(requestCompanies);
}

async function renderCompanies() {
}

async function filterCompanies() {
  const select = document.querySelector(".departments__container");

  select.addEventListener("change", async (e) => {
    const categoryName = e.target.options[e.target.selectedIndex].text;

    if (categoryName === "Todos") {
      const request = await getAllCompanies();
      renderCompaniesList(request);
    } else {
      
      const filteredCompanies = await getCompaniesByName(categoryName);
      renderCompaniesList(filteredCompanies);
    }
  });
}

navigationMenu();
renderCategoriesAndCompanies();
filterCompanies();