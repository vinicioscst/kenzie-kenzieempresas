import { allUsersProfile, getAllCompanies } from "./requests.js"
import { renderAllUsers, renderCompaniesSelect } from "./render.js"

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


renderSelect()
renderUsersList()