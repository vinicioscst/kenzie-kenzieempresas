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

export async function renderCompaniesList(arr, categories) {
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