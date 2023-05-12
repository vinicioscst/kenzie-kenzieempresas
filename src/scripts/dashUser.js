import { getDepartmentById, userProfile } from "./requests.js";
import { renderUserDepartmentDetails, renderUserInfo } from "./render.js";
import { toast } from "./toast.js";

const approvedColor = "#60d394";

function authentication() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
  const isAdm = JSON.parse(localStorage.getItem("kenzieempresas_isAdm"));

  if(token && isAdm === true) {
    location.replace('./dashAdmin.html')
  } else if(!token) {
    location.replace('./login.html')
  } 
}

function navigationMenu() {
    const logoutButton = document.querySelector(".button__logout");
  
    logoutButton.addEventListener("click", () => {
      localStorage.clear("kenzieempresas_authToken");
      localStorage.clear("kenzieempresas_isAdm");
      localStorage.clear("kenzieempresas_departmentid");
      localStorage.clear("kenzieempresas_userid");

        toast(approvedColor, 'Logout realizado com sucesso! Até logo 👋');
        setTimeout(() => { location.href = "../../"; }, 2000)
    });
}

async function getUserProfile() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

  const request = await userProfile(token);
  
  renderUserInfo(request);
}

async function getUserDepartmentInfo() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
  const userProfileRequest = await userProfile(token);
  const userDepartmentId = userProfileRequest.department_id
  
  if(userProfileRequest.department_id !== null) {
    const getUserDepartment = await getDepartmentById(token, userDepartmentId)
    
    const userDepartmentName = getUserDepartment.name
    const userCompanyName = getUserDepartment.company.name
    const userDepartmentEmployees = getUserDepartment.employees
  
    renderUserDepartmentDetails(userDepartmentName, userCompanyName, userDepartmentEmployees)
  }
  
}

authentication()
navigationMenu()
getUserProfile();
getUserDepartmentInfo()