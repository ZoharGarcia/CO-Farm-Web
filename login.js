document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = this[0].value.trim();
  const contrasena = this[1].value.trim();

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

  if (!user) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  localStorage.setItem('usuarioActual', JSON.stringify(user));
  window.location.href = "dashboard.html";
});
