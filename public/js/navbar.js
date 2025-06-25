   const user = JSON.parse(localStorage.getItem("user"));
  const loginBtn = document.getElementById("login-btn");

  console.log(loginBtn);
  
  if (user) {
    loginBtn.innerHTML = user.name;
    loginBtn.disabled = true;
    loginBtn.style.opacity = 0.8;
  } else {
    loginBtn.onclick = () => {
      window.location.href = "login.html";
    };
  }