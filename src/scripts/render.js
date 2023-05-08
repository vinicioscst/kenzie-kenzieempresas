import { allDepartments } from "./requests.js";

export async function renderDepartmentsList(arr) {
  const departmentsContainer = document.querySelector(
    ".departments__container"
  );

  departmentsContainer.insertAdjacentHTML(
    "beforeend",
    `<option value="None" hidden>Selecionar Setor</option>
  <option value="All">Todos</option>`
  );

  arr.forEach((department) => {
    departmentsContainer.insertAdjacentHTML(
      "beforeend",
      `<option value="${department.name}">${department.name}</option>`
    );
  });
}

export async function renderCompaniesList(arr) {
  const companiesContainer = document.querySelector(".list__container");

  arr.forEach((department) => {
    `<li class="company">
      <h3>Nome</h3>
      <button class="chip__button">Teste</button>
    </li>`
  });
}