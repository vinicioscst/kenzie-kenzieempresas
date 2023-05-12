import { deleteDepartment, dismissUser, editDepartment, hireUser } from "./dashAdmin.js"
import { renderDeleteDepartmentTitle, renderDepartmentEmployees, renderEmployeesOutOfWork, renderModalTexts } from "./render.js"
import { allUsersOutOfWork, allUsersProfile, getAllCompanies, readAllDepartments } from "./requests.js"


export function showAndCloseModalCreateDepartment () {
    const modal = document.querySelector('.create--department__modal')
    const closeModal = document.querySelector('.close--modal__create--department')

    const createDepartmentBtn = document.querySelector('.create--department__button')

    createDepartmentBtn.addEventListener('click', () => {
        modal.showModal()
    })

    closeModal.addEventListener('click', () => {
        modal.close()
    })
}

export function closeModalCreateDepartment () {
    const modal = document.querySelector('.create--department__modal')

    modal.close()
}

export async function showAndCloseModalViewDepartment () {
    const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
    const modal = document.querySelector('.view--department__modal')
    const closeModal = document.querySelector('.close--modal__view--department')

    const viewDepartmentBtn = document.querySelectorAll('.view--department--card__img')

    viewDepartmentBtn.forEach((button) => {
        const departmentId = button.dataset.id

        button.addEventListener('click', async () => {
            const allCompanies = await getAllCompanies()
            const allDepartments = await readAllDepartments(token)
            const outOfWork = await allUsersOutOfWork(token)
            const allEmployees = await allUsersProfile(token)
    
            renderEmployeesOutOfWork(outOfWork)
            renderModalTexts(departmentId, allDepartments, allCompanies)
            renderDepartmentEmployees(allEmployees, departmentId, allCompanies)

            hireUser()
            dismissUser()

            modal.showModal()
        })

        closeModal.addEventListener('click', () => {
            modal.close()
        })
    })
}

export function closeModalViewDepartment () {
    const modal = document.querySelector('.view--department__modal')

    modal.close()
}

export async function showAndCloseModalEditDepartment () {
    const modal = document.querySelector('.edit--department__modal')
    const editDepartmentBtn = document.querySelectorAll('.edit--department--card__img')
    const closeModal = document.querySelector('.close--modal__edit--department')
    
    editDepartmentBtn.forEach((button) => {
        const departmentId = button.dataset.id

        button.addEventListener('click', () => {
            localStorage.setItem('kenzieempresas_departmentid', departmentId)
            editDepartment() 
            modal.showModal()
        })
    })

    closeModal.addEventListener('click', () => {
        modal.close()
    })

}
export async function closeModalEditDepartment () {
    const modal = document.querySelector('.edit--department__modal')

    modal.close()
}

export async function showAndCloseModalDeleteDepartment () {
    const modal = document.querySelector('.delete--department__modal')
    const deleteDepartmentBtn = document.querySelectorAll('.delete--department--card__img')
    const closeModal = document.querySelector('.close--modal__delete--department')
    
    deleteDepartmentBtn.forEach((button) => {
        const departmentName = button.dataset.name
        const departmentId = button.dataset.id

        button.addEventListener('click', () => {
            localStorage.setItem('kenzieempresas_departmentname', departmentName)
            localStorage.setItem('kenzieempresas_departmentid', departmentId)

            renderDeleteDepartmentTitle()
            deleteDepartment() 
            modal.showModal()
        })
    })

    closeModal.addEventListener('click', () => {
        modal.close()
    })

}
export async function closeModalDeleteDepartment () {
    const modal = document.querySelector('.delete--department__modal')

    modal.close()
}

export function showAndCloseEditUser() {
    const modal = document.querySelector('.edit--user__modal')
    const closeModal = document.querySelector('.close--modal__edit--user')
    const editBtn = document.querySelectorAll('.edit--user--card__img')
    
    editBtn.forEach(button => {
        const userId = button.dataset.id

        button.addEventListener('click', () => {
            localStorage.setItem('kenzieempresas_userid', userId)
            modal.showModal()
        })
    });

    closeModal.addEventListener('click', () => {
        modal.close()
    })
}

export function closeModalEditUser () {
    const modal = document.querySelector('.edit--user__modal')

    modal.close()
}

export function showAndCloseDeleteUser() {
    const modal = document.querySelector('.delete--user__modal')
    const modalText = document.querySelector('.delete--user__title')
    const closeModal = document.querySelector('.close--modal__delete--user')
    const deleteBtn = document.querySelectorAll('.delete--user--card__img')
    
    deleteBtn.forEach(button => {
        const userId = button.dataset.id
        const userName = button.dataset.username

        button.addEventListener('click', () => {
            localStorage.setItem('kenzieempresas_userid', userId)
            modalText.innerText = `Realmente deseja remover o usuário ${userName}?`
            modal.showModal()
        })
    });

    closeModal.addEventListener('click', () => {
        modal.close()
    })
}

export function closeModalDeleteUser () {
    const modal = document.querySelector('.delete--user__modal')

    modal.close()
}