import { renderDepartmentsList } from "./render.js";

const requestHeaders = {
  "Content-Type": "application/json",
};

export async function allDepartments() {
  const request = await fetch("http://localhost:3333/categories/readAll", {
    method: "GET",
    headers: requestHeaders,
  }).then(async (res) => {
    if (res.ok) {
      const list = await res.json();
      return list;
    } else {
      const response = await res.json();
      console.log(response.message);
    }
  });
}

export async function allCompanies() {
  const request = await fetch("http://localhost:3333/companies/readAll").then(
    async (res) => {
      if (res.ok) {
        const list = await res.json();
        return list;
      } else {
        const response = await res.json();
        console.log(response.message);
      }
    }
  );
}
