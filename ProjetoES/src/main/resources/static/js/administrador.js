document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === 'admin1234') {
        window.location.href = '/controllerAdmin';
    } else {
        alert('Login ou senha incorretos. Por favor, tente novamente.');
    }
});