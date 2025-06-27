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

  contenedor.innerHTML = `<h2>${titulo}</h2><div id="valores"></div>`;

  const valoresDiv = document.getElementById("valores");

  // Crear contenedores para cada variable
  etiquetas.forEach((etiqueta, i) => {
    const canvasId = `grafico-${tipo}-${i}`;
    const valorId = `valor-${i}`;
    valoresDiv.innerHTML += `
      <div class="grafico-variable">
        <p><strong>${etiqueta}:</strong> <span id="${valorId}">-</span></p>
        <canvas id="${canvasId}"></canvas>
      </div>
    `;
  });

  const charts = etiquetas.map((etiqueta, i) => {
    const canvas = document.getElementById(`grafico-${tipo}-${i}`);
    return new Chart(canvas, {
      type: "line",
      data: {
        labels: Array.from({ length: 10 }, (_, j) => `-${10 - j}s`),
        datasets: [{
          label: etiqueta,
          data: Array(10).fill(0).map(() => randomValor()),
          borderColor: colorVariable(i),
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.3,
          fill: false
        }]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  });

  function actualizar() {
    charts.forEach((chart, i) => {
      const nuevo = randomValor();
      chart.data.datasets[0].data.push(nuevo);
      if (chart.data.datasets[0].data.length > 10) {
        chart.data.datasets[0].data.shift();
      }
      chart.update();
      document.getElementById(`valor-${i}`).textContent = nuevo;
    });
  }

  actualizar();
  intervalID = setInterval(actualizar, 5000);
}

function randomValor() {
  return +(Math.random() * 100).toFixed(2);
}

function colorVariable(i) {
  const colores = ["#4caf50", "#ff9800", "#795548", "#2196f3", "#9c27b0", "#ff5722"];
  return colores[i % colores.length];
}
