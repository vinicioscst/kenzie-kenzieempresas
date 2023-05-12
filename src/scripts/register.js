import { registerRequest } from "./requests.js";
import { toast } from "./toast.js";

function authentication() {
  const token = JSON.parse(localStorage.getItem("kenzieempresas_authToken"));
  const isAdm = JSON.parse(localStorage.getItem("kenzieempresas_isAdm"));

  if(token && isAdm === true) {
    location.replace('./dashAdmin.html')
  } else if(token && isAdm === false) {
    location.replace('./dashUser.html')
  } 
}

function navigationMenu() {
    const homeButton = document.querySelector(".button__home");
    const loginButton = document.querySelector(".button__login");
    const formGoToIndexButton = document.querySelector(".form__goToIndex");
  
    homeButton.addEventListener("click", () => {
      location.href = "../../";
    });
  
    loginButton.addEventListener("click", () => {
      location.href = "./login.html";
    });

    formGoToIndexButton.addEventListener("click", (e) => {
      e.preventDefault()
      location.href = "../../";
    });
  }

  async function registerEmployee () {
    const nameInput = document.querySelector(".form__name--input");
    const emailInput = document.querySelector(".form__email--input");
    const passwordInput = document.querySelector(".form__password--input");
    const submitButton = document.querySelector(".register__button");
    const errorColor = "#ee6055";
    let registerData = {}
    let count = 0
  
    submitButton.addEventListener('click', (e) => {
      e.preventDefault()
  
      if(emailInput.value.trim() === '' || passwordInput.value.trim() === '' || nameInput.value.trim() === '') {
        count++
      }
      registerData[nameInput.name] = nameInput.value
      registerData[emailInput.name] = emailInput.value
      registerData[passwordInput.name] = passwordInput.value
  
      if(count !== 0) {
        count = 0
        toast(errorColor , `Preencha os campos necessários!`)
      } else {
        const registerPush = registerRequest(registerData)
  
        return registerPush
      }
    })
  
  
  }
  

  authentication()
  navigationMenu();
  registerEmployee();