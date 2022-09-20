const loginEvent = async function(event) {
  event.preventDefault();
  
  const username = document.querySelector('#usernameInput');
  const password = document.querySelector('#passwordInput');
  
  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupEvent = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#newEmail').value.trim();
  const username = document.querySelector('#newUsername').value.trim();
  const password = document.querySelector('#newPassword').value.trim();

  if (email && username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};
  
document.querySelector('.loginForm').addEventListener('submit', loginEvent);
document.querySelector('.signupForm').addEventListener('submit', signupEvent);