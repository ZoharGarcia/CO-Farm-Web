// Cargar nombre de finca
const user = JSON.parse(localStorage.getItem('usuarioActual'));
if (!user) window.location.href = "index.html";
document.getElementById("nombreFinca").textContent = `Finca: ${user.finca}`;

function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  window.location.href = "index.html";
}

function generarDatosAleatorios(etiquetas, min, max) {
  return etiquetas.map(() => +(Math.random() * (max - min) + min).toFixed(2));
}

function mostrarEstacion(tipo) {
  const contenedor = document.getElementById("datosEstacion");
  contenedor.innerHTML = "";

  let titulo, etiquetas, unidades;

  if (tipo === "porcino") {
    titulo = "Corral Porcino";
    etiquetas = ["Humedad (%)", "Temperatura (°C)", "Amoniaco (ppm)", "CO₂ (ppm)"];
  } else if (tipo === "cultivo") {
    titulo = "Cultivos";
    etiquetas = ["Humedad Suelo (%)", "Temp. Ambiental (°C)", "Luz solar (Lux)", "pH Suelo"];
  } else if (tipo === "piscicultura") {
    titulo = "Piscicultura";
    etiquetas = ["Temp. Agua (°C)", "Oxígeno disuelto (mg/L)", "TDS (ppm)", "pH Agua"];
  }

  const datos = generarDatosAleatorios(etiquetas, 10, 100);

  const htmlDatos = etiquetas.map((et, i) =>
    `<p><strong>${et}:</strong> ${datos[i]}</p>`
  ).join("");

  const canvasId = `grafico-${tipo}`;
  contenedor.innerHTML = `
    <h2>${titulo}</h2>
    ${htmlDatos}
    <canvas id="${canvasId}"></canvas>
  `;

new Chart(document.getElementById(canvasId), {
  type: "line", // ← antes era "bar"
  data: {
    labels: etiquetas,
    datasets: [{
      label: `Valores de ${titulo}`,
      data: datos,
      borderColor: "#388e3c",
      backgroundColor: "rgba(56, 142, 60, 0.2)",
      fill: true,
      tension: 0.3,
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});
}
