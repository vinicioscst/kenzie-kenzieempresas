import { allUsersProfile, departmentsByCompany, getAllCompanies } from "./requests.js"
import { renderAllUsers, renderCompaniesSelect, renderDepartmentsCards } from "./render.js"

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


renderSelect()
renderDepartments()
renderUsersList()