export function renderCategoriesList(arr) {
  const departmentsContainer = document.querySelector(
    ".departments__container"
  );

  departmentsContainer.innerHTML = ''
  
  departmentsContainer.insertAdjacentHTML(
    "beforeend",
    `<option value="" hidden>Selecionar Setor</option>
  <option value="All">Todos</option>`
  );

  arr.forEach((category) => {
    departmentsContainer.insertAdjacentHTML(
      "beforeend",
      `<option value="${category.id}">${category.name}</option>`
    );
  });
}

export function renderCompaniesList(arr, categories) {
  const companiesContainer = document.querySelector(".list__container");
  companiesContainer.innerHTML = ''
  
  arr.forEach((company) => {
    const companyCategory = categories.filter((category) => {
      
      return category.id === company.category_id
    })
    
    companiesContainer.insertAdjacentHTML(
      "beforeend",
    `<li class="company">
      <h3 class="company__title">${company.name}</h3>
      <span class="chip__button">${companyCategory[0].name}</span>
    </li>`)
  });
}

export function renderUserInfo(userData) {
  const userHeader = document.querySelector(".user__header");
  const userCompanySection = document.querySelector(".user__company");
  const userCompanyHeader = document.querySelector(".company__header");
  const employeesList = document.querySelector(".employeers__list");
  const noCompanyText = document.querySelector(".no--company__text");

  userHeader.insertAdjacentHTML(
      "beforeend",
    `<h3 class="user__name">${userData.name}</h3>
    <p class="user__email">${userData.email}</p>`
  )

  if(userData.department_id === null) {
    userCompanyHeader.style.display = "none";
    employeesList.style.display = "none";
    userCompanySection.style.justifyContent = "center";
  } else {
    noCompanyText.style.display = "none";
  }
}

export function renderCompaniesSelect(arr) {
  const companiesSelect = document.querySelector(".companies__container");
  companiesSelect.innerHTML = ''
  
  companiesSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="" hidden>Selecionar Empresa</option>`
  );

  arr.forEach((company) => {
    
    companiesSelect.insertAdjacentHTML(
      "beforeend",
    `<li class="company">
      <option id="${company.id}" value="${company.name}">${company.name}</option>
    </li>`)
  });

}

export function renderAllUsers(arr, companies) {
  const allUsersList = document.querySelector(".registered--users__list");
  allUsersList.innerHTML = ''

  arr.forEach((user) => {

    const filteredCompany = companies.filter((company) => {
      
      return user.company_id === company.id
    })
    
    if(user.company_id === null) {
      allUsersList.insertAdjacentHTML(
        "beforeend",
      `<div class="users__card">
      <div class="users__info">
        <h4 class="users__name">${user.name}</h4>
        <p class="company__name">Não possui contratação</p>
      </div>
      <div class="card__options">
        <img src="../images/vectors/edit.svg" alt="Editar" />
        <img src="../images/vectors/delete.svg" alt="Deletar" />
      </div>
    </div>`)
    } else {
      allUsersList.insertAdjacentHTML(
        "beforeend",
      `<div class="users__card">
      <div class="users__info">
        <h4 class="users__name">${user.name}</h4>
        <p class="company__name">${filteredCompany[0].name}</p>
      </div>
      <div class="card__options">
        <img src="../images/vectors/edit.svg" alt="Editar" />
        <img src="../images/vectors/delete.svg" alt="Deletar" />
      </div>
    </div>`)
    }
  });
}