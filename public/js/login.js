const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { email, password } = event.target;
  const response = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.href = `/`;
  } else alert(data.message);
});
