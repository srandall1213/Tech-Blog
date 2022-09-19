const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#usernameInput');
    const password = document.querySelector('#passwordInput');
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#newEmail').value.trim();
  const username = document.querySelector('#newUsername').value.trim();
  const password = document.querySelector('#newPassword').value.trim();

  if (email && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
};
  
document
  .querySelector('.loginForm')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signupForm')
  .addEventListener('submit', signupFormHandler);