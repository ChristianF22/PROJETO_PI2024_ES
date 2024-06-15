document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const login1 = document.getElementById('login1').value;
    const senha1 = document.getElementById('senha1').value;

    if (login1 === 'admin' && senha1 === 'admin1234') {
        window.location.href = '/controllerAdmin';
    } else {
        alert('Login ou senha incorretos. Por favor, tente novamente.');
    }
});