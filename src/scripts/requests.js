import { renderUsersList } from "./dashAdmin.js";
import { showAndCloseModalViewDepartment } from "./modal.js";
import { renderEmployeesOutOfWork } from "./render.js";
import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333";
const requestHeaders = {
  "Content-Type": "application/json",
};
const errorColor = "#ee6055";
const approvedColor = "#60d394";

export async function getAllCategories() {
  const categories = await fetch(`${baseUrl}/categories/readAll`, {
    method: "GET",
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      localStorage.setItem('allCategories', JSON.stringify(response))
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
    if (res.ok) {
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
  const filteredCompanies = await fetch(
    `${baseUrl}/companies/readByCategory/${department}/`,
    {
      method: "GET",
    }
  ).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response;
    } else {
      const response = await res.json();
      return response.message;
    }
  });

  return filteredCompanies;
}

export async function loginRequest(loginData) {
  const loginPush = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginData),
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      const { authToken, isAdm } = response;
      const approvedMessage = 'Login realizado com sucesso!'

      toast(approvedColor, approvedMessage);

      localStorage.setItem('kenzieempresas_authToken', JSON.stringify(authToken));
      localStorage.setItem('kenzieempresas_isAdm', JSON.stringify(isAdm));
      setTimeout(() => {
        if (response.isAdm === true) {
          location.href = "./dashAdmin.html";
        } else {
          location.href = "./dashUser.html";
        }
      }, 2000)
      } else {
        const response = await res.json();
        toast(errorColor, response.message);
      }
  });

  return loginPush
}

export async function registerRequest(registerData) {
  const registerPush = await fetch(`${baseUrl}/employees/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(registerData),
  }).then(async (res) => {
    if (res.ok) {
      const toastMsg = 'Conta criada com sucesso!'
      toast(approvedColor , toastMsg);
      setTimeout(() => {
        location.href = "./login.html";
      }, 2000)
    } else {
      const response = await res.json();
      toast(errorColor, response.message);
    }
  });
}

export async function userProfile(token) {
  const profileRequest = await fetch(`${baseUrl}/employees/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return profileRequest
}

export async function allUsersProfile(token) {
  const profilesRequest = await fetch(`${baseUrl}/employees/readAll`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return profilesRequest
}

export async function departmentsByCompany(companyId, token) {
  const request = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function requestCreateDepartment(token, departmentData) {
  const request = await fetch(`${baseUrl}/departments/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentData)
  }).then(async (res) => {
    if (res.ok) {
      toast(approvedColor, 'Departamento criado com sucesso!');
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function requestEditDepartment(token, departmentId, departmentData) {
  const request = await fetch(`${baseUrl}/departments/update/${departmentId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentData)
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      toast(approvedColor, response.message);
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function requestEditUser(token, userData, userId) {
  const request = await fetch(`${baseUrl}/employees/updateEmployee/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  }).then(async (res) => {
    if (res.ok) {
      toast(approvedColor, 'Usuário editado com sucesso!');
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function requestDeleteUser(token, userId) {
  const request = await fetch(`${baseUrl}/employees/deleteEmployee/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }).then(async (res) => {
    if (res.ok) {
      toast(approvedColor, 'Usuário deletado com sucesso!');
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function allUsersOutOfWork (token) {
  const request = await fetch(`${baseUrl}/employees/outOfWork`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function readAllDepartments (token) {
  const request = await fetch(`${baseUrl}/departments/readAll`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      return response
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}

export async function hireEmployee (token, department, userId) {
  const request = await fetch(`${baseUrl}/employees/hireEmployee/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department)
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      toast(approvedColor, response.message);
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, 'Não é possível contratar um usuário no momento!');
    }
  });
  return request
}

export async function dismissEmployee (token, userId) {
  const request = await fetch(`${baseUrl}/employees/dismissEmployee/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      toast(approvedColor, response.message);
      setTimeout(() => {
        location.reload()
      }, 2000)
    } else {
      const response = await res.json();
      
      toast(errorColor, response.message);
    }
  });
  return request
}