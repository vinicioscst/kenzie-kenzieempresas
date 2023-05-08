function navigationMenu() {
    const homeButton = document.querySelector(".button__home");
    const registerButton = document.querySelector(".button__register");
  
    homeButton.addEventListener("click", () => {
      location.href = "../../";
    });
  
    registerButton.addEventListener("click", () => {
      location.href = "./register.html";
    });
  }
  
  navigationMenu();