const baseUrl = 'http://localhost:3333'
const requestHeaders = {
  'Content-Type': 'application/json'
}

export async function getAllCategories() {
  const categories = await fetch(`${baseUrl}/categories/readAll`, {
    method: "GET",
  }).then(async (res) => {
    if(res.ok) {
      const response = await res.json();
      return response;
    } else {
      const response = await res.json();
      return response.message;
    }
  });

  return categories;
}

export async function getAllCompanies() {
  const companies = await fetch(`${baseUrl}/companies/readAll`, {
    method: "GET",
  }).then(async (res) => {
    if(res.ok) {
      const response = await res.json();
      return response;
    } else {
      const response = await res.json();
      return response.message;
    }
  });

  return companies;
}

export async function getCompaniesByName(department) {
  const filteredCompanies = await fetch(`${baseUrl}/companies/readByCategory/${department}/`, {
    method: "GET",
  }).then(async (res) => {
    if(res.ok) {
      const response = await res.json();
      return response;
    } else {
      const response = await res.json();
      return response.message;
    }
  });

  return filteredCompanies;
}

export async function loginRequest (loginData) {
  const loginPush = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginData)
  })
  .then(async (res) => {
    if(res.ok) {
      const response = await res.json()
      console.log()
      if(response.isAdm === true) {
        location.href = "./dashAdmin.html";
      } else {
        location.href = "./dashUser.html";
      }
    }
  })
}