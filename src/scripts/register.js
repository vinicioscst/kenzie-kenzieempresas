function navigationMenu() {
    const homeButton = document.querySelector(".button__home");
    const loginButton = document.querySelector(".button__login");
  
    homeButton.addEventListener("click", () => {
      location.href = "../../";
    });
  
    loginButton.addEventListener("click", () => {
      location.href = "./login.html";
    });
  }
  
  navigationMenu();