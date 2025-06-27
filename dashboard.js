const user = JSON.parse(localStorage.getItem('usuarioActual'));
if (!user) window.location.href = "index.html";
document.getElementById("nombreFinca").textContent = `Finca: ${user.finca}`;

function cerrarSesion() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
}

let chart = null;
let intervalID = null;

function mostrarEstacion(tipo) {
  clearInterval(intervalID);

  const contenedor = document.getElementById("datosEstacion");
  contenedor.innerHTML = "";

  let titulo, etiquetas;

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

  const canvasId = `grafico-${tipo}`;
  contenedor.innerHTML = `
    <h2>${titulo}</h2>
    <div id="valores"></div>
    <canvas id="${canvasId}"></canvas>
  `;

  const valoresDiv = document.getElementById("valores");
  const colores = ["#4caf50", "#ffeb3b", "#795548", "#8bc34a"];

  const datasets = etiquetas.map((et, i) => ({
    label: et,
    data: Array(10).fill(0).map(() => randomValor()),
    borderColor: colores[i % colores.length],
    fill: false,
    tension: 0.3
  }));

  chart = new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: Array.from({ length: 10 }, (_, i) => `-${10 - i}s`),
      datasets: datasets
    },
    options: {
      responsive: true,
      animation: false,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  function actualizarDatos() {
    valoresDiv.innerHTML = "";

    datasets.forEach((ds, index) => {
      const nuevo = randomValor();
      ds.data.push(nuevo);
      if (ds.data.length > 10) ds.data.shift();

      valoresDiv.innerHTML += `<p><strong>${etiquetas[index]}:</strong> ${nuevo}</p>`;
    });

    chart.update();
  }

  actualizarDatos();
  intervalID = setInterval(actualizarDatos, 5000);
}

function randomValor() {
  return +(Math.random() * 100).toFixed(2);
}

