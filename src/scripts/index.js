import { getAllCategories, getAllCompanies, getCompaniesByName, } from "./requests.js";
import { renderCategoriesList, renderCompaniesList } from "./render.js";


function authentication() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
  const isAdm = JSON.parse(localStorage.getItem("kenzieempresas_isAdm"));

  if(token && isAdm === true) {
    location.replace('./src/pages/dashAdmin.html')
  } else if(token && isAdm === false) {
    location.replace('./src/pages/dashUser.html')
  } 
}


function indexNavigationMenu() {
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
  renderCompaniesList(requestCompanies, requestCategories);
}


async function filterCompanies() {
  const select = document.querySelector(".departments__container");

  select.addEventListener("change", async (e) => {
    const categoryName = e.target.options[e.target.selectedIndex].text;
    const requestCategories = await getAllCategories();

    if (categoryName === "Todos") {
      const request = await getAllCompanies();
      renderCompaniesList(request, requestCategories);
    } else {
      
      const filteredCompanies = await getCompaniesByName(categoryName);
      renderCompaniesList(filteredCompanies, requestCategories);
    }
  });
}

authentication()
indexNavigationMenu();
renderCategoriesAndCompanies();
filterCompanies();