const regForm = document.querySelector('#regForm');

regForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    email, name, password,
  } = event.target;
  const response = await fetch('/users/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      name: name.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    window.location.href = `/`;
  } else alert(data.message);
});
