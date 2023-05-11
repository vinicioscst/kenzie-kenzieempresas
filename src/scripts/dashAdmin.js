import { allUsersProfile, departmentsByCompany, getAllCompanies, requestCreateDepartment } from "./requests.js"
import { renderAllUsers, renderCompaniesSelect, renderDepartmentsCards, renderSelectCreateDepartmentModal } from "./render.js"
import { toast } from "./toast.js";
import { showAndCloseModalCreateDepartment } from "./modal.js";

const errorColor = "#ee6055";
const approvedColor = "#60d394";

function navigationMenu() {
    const logoutButton = document.querySelector(".button__logout");
  
    logoutButton.addEventListener("click", () => {
        const token = localStorage.clear("kenzieempresas_authToken");
        const isAdm = localStorage.clear("kenzieempresas_isAdm");

        toast(approvedColor, 'Logout realizado com sucesso! Até logo 👋');
        setTimeout(() => { location.href = "./login.html"; }, 3000)
    });
}

async function renderSelect() {
    const request = await getAllCompanies()
    const renderCompanies = renderCompaniesSelect(request)

    return renderCompanies
}

async function renderUsersList() {
    const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

    const requestUsers = await allUsersProfile(token)
    const requestCompanies = await getAllCompanies()
    const renderUsers = renderAllUsers(requestUsers, requestCompanies)

    return renderUsers
}

async function renderDepartments() {
    const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));

    const select = document.querySelector('.companies__container')
    const departmentsList = document.querySelector('.departments__list')
    const noDepartmentTextSection = document.querySelector('.no--departments__container')
    const noDepartmentText = document.querySelector('.no--departments__text')

    select.addEventListener('change', async (e) => {
        const companyId = e.target.options[e.target.selectedIndex].value;
        const companyName = e.target.options[e.target.selectedIndex].innerText;
        const request = await departmentsByCompany(companyId, token)
        
        if (request.length < 1) {
            if(!departmentsList.classList.contains('hidden')) {
                noDepartmentTextSection.classList.remove('hidden')
                departmentsList.classList.add('hidden')
            }
            noDepartmentText.innerText = `Empresa ${companyName} não possui departamentos`
        } else {
            departmentsList.classList.remove('hidden')
            noDepartmentTextSection.classList.add('hidden')
            renderDepartmentsCards(request, companyName)
        }
        
    })

}

async function createDepartmentModal() {
    const requestCompanies = await getAllCompanies()
    renderSelectCreateDepartmentModal(requestCompanies)
    showAndCloseModalCreateDepartment()
}

async function createDepartment() {
    const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
    const departmentName = document.querySelector('.input__department--name')
    const departmentdescription = document.querySelector('.input__department--description')
    const company = document.querySelector('.modal__companies--list')
    const sendRequestBtn = document.querySelector('.create__department button')
    const errorColor = "#ee6055";
    let departmentData = {}
    let count = 0

    company.addEventListener('change', (e) => {
        const companyId = e.target.options[e.target.selectedIndex].value;
        
        if (companyId.trim() === "") {
            count++
        } else {
            departmentData[company.name] = companyId
        }
    })
    
    sendRequestBtn.addEventListener('click', (e) => {
        e.preventDefault()
        
        if(departmentName.value.trim() === "" || departmentdescription.value.trim() === "") {
            count++
        } else {
            departmentData[departmentName.name] = departmentName.value
            departmentData[departmentdescription.name] = departmentdescription.value
        }

        if(count !== 0) {
            count = 0
            toast(errorColor, 'Por favor, preencha todos os dados')
        } else {
            requestCreateDepartment(token, departmentData)
        }
    })
}


navigationMenu()
renderSelect()
renderDepartments()
renderUsersList()
createDepartmentModal()
createDepartment()