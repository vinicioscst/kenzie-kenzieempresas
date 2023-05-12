import { loginRequest } from "./requests.js";
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
    const registerButton = document.querySelector(".button__register");
    const formRegisterButton = document.querySelector(".form__goToRegister");
  
    homeButton.addEventListener("click", () => {
      location.href = "../../";
    });
    
    registerButton.addEventListener("click", () => {
      location.href = "./register.html";
    });

    formRegisterButton.addEventListener("click", (e) => {
      e.preventDefault()
      location.href = "./register.html";
    });
}

function login () {
  const emailInput = document.querySelector(".form__email--input");
  const passwordInput = document.querySelector(".form__password--input");
  const submitButton = document.querySelector(".login__button");
  const errorColor = '#ee6055';
  let loginData = {}
  let count = 0

  submitButton.addEventListener('click', e => {
    e.preventDefault()

    if(emailInput.value.trim() === '' || passwordInput.value.trim() === '' ) {
      count++
    }
      loginData[emailInput.name] = emailInput.value
      loginData[passwordInput.name] = passwordInput.value

    if(count !== 0) {
      count = 0
      toast(errorColor , 'Preencha os campos necessários!')
    } else {
      const loginPush = loginRequest(loginData)

      return loginPush
    }
  })


}
  

authentication()
navigationMenu();
login();