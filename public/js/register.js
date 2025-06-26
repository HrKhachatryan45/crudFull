const form = document.getElementById('formLogin');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    const errorDiv = document.getElementById('error-div');

    errorDiv.textContent = '';
    errorDiv.classList.remove('error-msg');

    if (!response.ok || json.error) {
      errorDiv.textContent = json.error || 'Login failed';
      errorDiv.classList.add('error-msg');
      return;
    }
    const successDiv = document.getElementById('success-div');

    successDiv.textContent = 'Successfully Registered!'
    successDiv.classList.add('success-msg')

       localStorage.setItem('user',JSON.stringify(json.user))
    localStorage.setItem('token',JSON.stringify(json.token))
    setTimeout(() => {
        window.location.href = 'index.html'
    },2000)

 
  
  } catch (error) {
    console.error('Fetch failed:', error);

  }
});
