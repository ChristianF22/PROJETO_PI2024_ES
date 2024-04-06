const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `login=${login}&senha=${senha}` 
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; 
        } else {
            errorMessage.textContent = 'Credenciais inválidas. Por favor, tente novamente.'; 
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
        errorMessage.textContent = 'Erro ao fazer login. Por favor, tente novamente mais tarde.';
    });
});
