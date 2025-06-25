const reRoutePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const currentPage = window.location.pathname;

  if (currentPage.endsWith('index.html') && !user) {
    window.location.href = 'login.html';
  }

  if ((currentPage.endsWith('login.html') || currentPage.endsWith('register.html')) && user) {
    window.location.href = 'index.html';
  }
};

reRoutePage();

window.addEventListener('load',() => {
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

   document.getElementById('logOutBtn').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout',{
        method:"POST",
        headers:{'Content-Type':'application/json'}
      })

      localStorage.removeItem('user')
      window.location.href = 'login.html'
      
    } catch (error) {
      console.log(error);
      
    }
  })
})

window.addEventListener('load',() => {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user.isAdmin && window.location.pathname.endsWith('cart.html')) {
        window.location.href = 'index.html'
    }
    if (user.isAdmin) {
        document.getElementById('cartA').style.display = 'none'
      
    }
})