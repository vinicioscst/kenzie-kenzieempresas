import { getAllCategories, getAllCompanies, getCompaniesByName } from "./requests.js";
import { renderDepartmentsList, renderCompaniesList } from "./render.js";

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

async function renderCategories() {
  const request = await getAllCategories();
  renderDepartmentsList(request)

}

async function renderCompanies() {
  const request = await getAllCompanies();
  
  renderCompaniesList(request)

}

async function filterCompanies() {
  const select = document.querySelector(".departments__container");

  select.addEventListener('change', async (e) => {
    const categoryName = e.target.options[e.target.selectedIndex].text
    
    if(categoryName === "Todos") {
      const request = await getAllCompanies();
      renderCompaniesList(request)
    } else {
    const filteredCompanies = await getCompaniesByName(categoryName)
    renderCompaniesList(filteredCompanies)
    }
  })
}

navigationMenu();
renderCategories()
renderCompanies()
filterCompanies()