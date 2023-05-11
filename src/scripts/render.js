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
      <option value="${company.id}">${company.name}</option>
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
        <img data-id="${user.id}" class="edit--user--card__img" src="../images/vectors/edit.svg" alt="Editar" />
        <img data-id="${user.id}" data-username="${user.name}" class="delete--user--card__img" src="../images/vectors/delete.svg" alt="Deletar" />
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
        <img class="edit--user--card__img" src="../images/vectors/edit.svg" alt="Editar" />
        <img class="delete--user--card__img" src="../images/vectors/delete.svg" alt="Deletar" />
      </div>
    </div>`)
    }
  });
}


export function renderDepartmentsCards(departments, company) {
  const departmentsList = document.querySelector('.departments__list')
  departmentsList.innerHTML = ''

  departments.forEach((department) => {
    console.log(department)
    departmentsList.insertAdjacentHTML("beforeend",
    `<div class="department__card">
    <div class="department__info">
      <h4 class="department__name">${department.name}</h4>
      <p class="department__description">${department.description}</p>
      <p class="company__name">${company}</p>
    </div>
    <div class="card__options">
      <img class="view--department--card__img" src="../images/vectors/view.svg" alt="Visualizar" />
      <img class="edit--department--card__img" src="../images/vectors/edit.svg" alt="Editar" />
      <img class="delete--department--card__img" src="../images/vectors/delete.svg" alt="Deletar" />
    </div>
  </div>`
    )
  })
}

export function renderSelectCreateDepartmentModal(arr) {
  const companiesList = document.querySelector(".modal__companies--list");
  companiesList.insertAdjacentHTML(
    "beforeend",
    `<option value="" hidden>Selecionar Empresa</option>`
  );
  arr.forEach((company) => {
  
    companiesList.insertAdjacentHTML(
      "beforeend",
    `<li class="company">
      <option value="${company.id}">${company.name}</option>
    </li>`)
  });
}