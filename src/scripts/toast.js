export function toast(color, message) {
    const toast = document.querySelector('.toast__message')
    const toastText = document.querySelector('.toast__message > p')
  
    toastText.innerText = `${message}`
  
    toast.style = `background-color: ${color}`
  
    toast.classList.remove('hidden')
  }