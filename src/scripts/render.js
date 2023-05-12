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
    
    if(user.department_id === null) {
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
        <img data-id="${user.id}" class="edit--user--card__img" src="../images/vectors/edit.svg" alt="Editar" />
        <img data-id="${user.id}" data-username="${user.name}" class="delete--user--card__img" src="../images/vectors/delete.svg" alt="Deletar" />
      </div>
    </div>`)
    }
  });
}


export function renderDepartmentsCards(departments, company) {
  const departmentsList = document.querySelector('.departments__list')
  departmentsList.innerHTML = ''

  departments.forEach((department) => {
    
    departmentsList.insertAdjacentHTML("beforeend",
    `<div class="department__card">
    <div class="department__info">
      <h4 class="department__name">${department.name}</h4>
      <p class="department__description">${department.description}</p>
      <p class="company__name">${company}</p>
    </div>
    <div class="card__options">
      <img data-id="${department.id}" data-name="${department.name}" class="view--department--card__img" src="../images/vectors/view.svg" alt="Visualizar" />
      <img data-id="${department.id}" data-name="${department.name}" class="edit--department--card__img" src="../images/vectors/edit.svg" alt="Editar" />
      <img data-id="${department.id}" data-name="${department.name}" class="delete--department--card__img" src="../images/vectors/delete.svg" alt="Deletar" />
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

export function renderEmployeesOutOfWork (arr) {
  const outOfWorkSelect = document.querySelector(".modal__out--of--work--list");
  outOfWorkSelect.innerHTML = ''
  
  outOfWorkSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="" hidden>Selecionar Usuário</option>`
  );
  arr.forEach((user) => {
    outOfWorkSelect.insertAdjacentHTML(
      "beforeend",
    `<li class="out--of--work__user">
      <option value="${user.id}">${user.name}</option>
    </li>`)
  });
}

export function renderModalTexts (departmentId, departments, companies) {
  const modalHeader = document.querySelector('.view--department__modal > .modal__container > .modal__header')
  modalHeader.innerHTML = ''

  const filteredDepartment = departments.filter((department) => {
    return department.id === departmentId
  })
  
  const filteredCompany = companies.filter((company) => {
    return company.id === filteredDepartment[0].company_id
  })
  

  modalHeader.insertAdjacentHTML('beforeend',
    `<h2 data-id="${departmentId}" class="hire--modal__title">${filteredDepartment[0].name}</h2>
     <div class="modal__department--info">
      <h4 class="modal__description">${filteredDepartment[0].description}</h4>
      <p class="modal__companytitle">${filteredCompany[0].name}</p>
     </div>`
  )
}

export function renderDepartmentEmployees (employees, department, companies) {
  const employeesList = document.querySelector('.employees__list')
  employeesList.innerHTML = ''

  const departmentEmployees = employees.filter((employee) => {
    return employee.department_id === department
  })

  departmentEmployees.forEach((departmentEmployee) => {
    const departmentCompany = companies.filter((company) => {
      return departmentEmployee.company_id === company.id
    })
    
    employeesList.insertAdjacentHTML('beforeend',
    `<li class="employees__card">
      <div class="card__header">
      <h4>${departmentEmployee.name}</h4>
      <p>${departmentCompany[0].name}</p>
      </div>
      <button data-id="${departmentEmployee.id}" class="dismiss__employee">Desligar</button>
     </li>`
    )
  })
}

export function renderDeleteDepartmentTitle () {
  const departmentName = localStorage.getItem("kenzieempresas_departmentname");
  const modalTitle = document.querySelector('.delete--department__modal h2')

  modalTitle.innerText = `Realmente deseja remover o Departamento ${departmentName} e demitir seus funcionários?`
}

export function renderUserDepartmentDetails (department, company, employees) {
  const companyAndDepartmentNames = document.querySelector('.company--department__name')
  const employeesList = document.querySelector('.employeers__list')
  
  companyAndDepartmentNames.innerText = `${company} - ${department}`

  employeesList.innerHTML = ''
    employees.forEach((employee) => {
      employeesList.insertAdjacentHTML('beforeend', `
      <div class="employee__card">
      <h4 class="employee__name">${employee.name}</h4>
      </div>
      `)
    })

}