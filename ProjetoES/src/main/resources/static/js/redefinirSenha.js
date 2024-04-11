const forgotPasswordButton = document.getElementById('forgotPasswordButton');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const loginError = document.getElementById('loginError');
const novaSenhaError = document.getElementById('novaSenhaError');
const successMessage = document.getElementById('successMessage');

forgotPasswordButton.addEventListener('click', function(event) {
    event.preventDefault();
    forgotPasswordForm.style.display = 'block';
    successMessage.style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
});

resetPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();

    loginError.textContent = '';
    novaSenhaError.textContent = '';
  

    const login = document.getElementById('login').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, digite novamente.');
        return;
    }

    fetch('/esquecerSenha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `login=${login}&novaSenha=${novaSenha}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Senha atualizada com sucesso!') {
            successMessage.textContent = data;
            successMessage.style.display = 'block';

            resetPasswordForm.reset();

            setTimeout(function() {
                successMessage.style.display = 'none';
                forgotPasswordForm.style.display = 'none';
                document.getElementById('loginForm').style.display = 'block'; 
            }, 3000);
        } else {
            alert(data);
        }
    })
    .catch(error => {
        console.error('Erro ao redefinir senha:', error);
        alert('Erro ao redefinir senha. Por favor, tente novamente mais tarde.');
    });
});
