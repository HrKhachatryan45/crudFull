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

// ✅ Wait until navbar is loaded
window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const waitForNavbar = setInterval(() => {
    const loginBtn = document.getElementById("login-btn");
    const logOutBtn = document.getElementById("logOutBtn");
    const cartA = document.getElementById("cartA");

    if (loginBtn && logOutBtn && cartA) {
      clearInterval(waitForNavbar); // Stop checking once elements are ready

      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        loginBtn.innerHTML = user.name;
        loginBtn.disabled = true;
        loginBtn.style.opacity = 0.8;
      } else {
        loginBtn.onclick = () => window.location.href = "login.html";
      }

      logOutBtn.addEventListener("click", async () => {
        try {
          await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          localStorage.removeItem("user");
          window.location.href = "login.html";
        } catch (error) {
          console.error(error);
        }
      });

      // Admin logic
      if (user?.isAdmin && window.location.pathname.endsWith("cart.html")) {
        window.location.href = "index.html";
      }
      if (user?.isAdmin) {
        cartA.style.display = "none";
      }
    }

    if (!user) {
      logOutBtn.style.display = 'none'
    }else{
      logOutBtn.style.display = 'flex'
    }
  }, 100); // Check every 100ms until navbar is ready
});

window.addEventListener('load',() => {

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && !user.isAdmin) {
    document.getElementsByClassName('product-form')[0].style.display = 'none'
  }
})

 function updateCartQuantity() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const quantityElem = document.getElementById('cart-quantity');

    quantityElem.textContent = cart.length;
  }else{
  document.getElementById('cart-quantity').style.display = 'none'

  }
}



window.addEventListener('load',updateCartQuantity)
window.addEventListener('cartUpdated',updateCartQuantity)
