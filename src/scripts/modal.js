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