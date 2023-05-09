import { loginRequest } from "./requests.js";

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
      alert('Preencha os campos necessários!')
    } else {
      const loginPush = loginRequest(loginData)

      return loginPush
    }
  })


}
  


  navigationMenu();
  login();