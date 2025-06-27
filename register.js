document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = this[0].value.trim();
  const apellido = this[1].value.trim();
  const finca = this[2].value.trim();
  const usuario = this[3].value.trim();
  const contrasena = this[4].value.trim();

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe = usuarios.find(u => u.usuario === usuario);

  if (existe) {
    alert("Ese usuario ya está registrado.");
    return;
  }

  usuarios.push({ usuario, contrasena, nombre, apellido, finca });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  window.location.href = "index.html";
});

