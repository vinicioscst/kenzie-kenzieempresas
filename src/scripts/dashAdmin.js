import { allUsersProfile, departmentsByCompany, dismissEmployee, getAllCompanies, hireEmployee, requestCreateDepartment, requestDeleteUser, requestEditDepartment, requestEditUser } from "./requests.js"
import { renderAllUsers, renderCompaniesSelect, renderDepartmentsCards, renderSelectCreateDepartmentModal } from "./render.js"
import { toast } from "./toast.js";
import { closeModalCreateDepartment, showAndCloseModalCreateDepartment, showAndCloseEditUser, closeModalEditUser, showAndCloseDeleteUser, closeModalDeleteUser, showAndCloseModalViewDepartment, closeModalViewDepartment, showAndCloseModalEditDepartment, closeModalEditDepartment } from "./modal.js";

const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
const errorColor = "#ee6055";
const approvedColor = "#60d394";


function authentication() {
    const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
    const isAdm = JSON.parse(localStorage.getItem("kenzieempresas_isAdm"));
  
    if(token && isAdm === false) {
      location.replace('./dashUser.html')
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
        setTimeout(() => { location.href = "./login.html"; }, 2000)
    });
}

async function renderSelect() {
    const request = await getAllCompanies()
    const renderCompanies = renderCompaniesSelect(request)

    return renderCompanies
}

export async function renderUsersList() {
    const requestUsers = await allUsersProfile(token)
    const requestCompanies = await getAllCompanies()
    const renderUsers = renderAllUsers(requestUsers, requestCompanies)
    showAndCloseEditUser()
    showAndCloseDeleteUser()
    return renderUsers
}

async function renderDepartments() {
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
            noDepartmentText.innerHTML = `Empresa <strong>${companyName}</strong> não possui departamentos`
        } else {
            departmentsList.classList.remove('hidden')
            noDepartmentTextSection.classList.add('hidden')
            renderDepartmentsCards(request, companyName)
            showAndCloseModalViewDepartment()
            showAndCloseModalEditDepartment()
        }
        
    })

}

async function createDepartmentModal() {
    const requestCompanies = await getAllCompanies()
    renderSelectCreateDepartmentModal(requestCompanies)
    showAndCloseModalCreateDepartment()
}

async function createDepartment() {
    const departmentName = document.querySelector('.input__department--name')
    const departmentdescription = document.querySelector('.input__department--description')
    const company = document.querySelector('.modal__companies--list')
    const sendRequestBtn = document.querySelector('.create__department button')
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
            closeModalCreateDepartment()
        }
    })
}


// Section pra desenvolver as funções de visualizar, editar e deletar departamentos
export async function hireUser () {
    const outOfWorkList = document.querySelector('.modal__out--of--work--list')
    const hireBtn = document.querySelector('.hire--employee button')
    const departmentTitle = document.querySelector('.hire--modal__title')
    let userId = ''
    let departmentId = {}
    let count = 0

    outOfWorkList.addEventListener('change', (e) => {
        userId = e.target.options[e.target.selectedIndex].value;
        
        if (userId.trim() === "") {
            count++
        }
    })

    departmentId["department_id"] = departmentTitle.dataset.id
    

    hireBtn.addEventListener('click', (e) => {
        e.preventDefault()

        if(count !== 0) {
            count = 0
            toast(errorColor, 'Por favor, escolha um dos usuários')
        } else {
            hireEmployee(token, departmentId, userId)
            closeModalViewDepartment()
        }
    })
}

export async function dismissUser () {
    const dismissBtn = document.querySelectorAll('.dismiss__employee')

    dismissBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const userId = button.dataset.id

            dismissEmployee(token, userId)
            closeModalViewDepartment()
        })
    })
}

export async function editDepartment () {
    const departmentId = localStorage.getItem("kenzieempresas_departmentid");
    const newDescription = document.querySelector('.edit__department textarea')
    const editBtn = document.querySelector('.edit__department button')
    let departmentData = {}
    let count = 0

    editBtn.addEventListener('click', (e) => {
            e.preventDefault()
            
            if(newDescription.value.trim() === '') {
                count++
            } else {
                departmentData[newDescription.name] = newDescription.value
            }

            if(count !== 0) {
                count = 0
                toast(errorColor, 'Por favor, insira uma descrição')
            } else {
                requestEditDepartment(token, departmentId, departmentData)
                closeModalEditDepartment()
        }
        })
}

async function editUser () {
    const formInputs = document.querySelectorAll('.edit__user input')
    const sendRequestBtn = document.querySelector('.edit__user button')
    let userData = {}
    let count = 0

    sendRequestBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const userId = localStorage.getItem("kenzieempresas_userid")

        formInputs.forEach(input => {
            if(input.value.trim() === "") {
                count++
            } else {
                userData[input.name] = input.value
            }
        })

        if(count > 1) {
            count = 0
            toast(errorColor, 'Por favor, preencha todos os dados')
        } else {
            requestEditUser(token, userData, userId)
            closeModalEditUser()
        }
    })
}

async function deleteUser () {
    const sendRequestBtn = document.querySelector('.delete__user button')

    sendRequestBtn.addEventListener('click', (e) => {
        e.preventDefault()

        const userId = localStorage.getItem("kenzieempresas_userid")
        requestDeleteUser(token, userId)
        closeModalDeleteUser()
    })
}

authentication()
navigationMenu()
renderSelect()
renderDepartments()
renderUsersList()
createDepartmentModal()
createDepartment()
editUser()
deleteUser()