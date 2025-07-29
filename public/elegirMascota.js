// Mascotas predefinidas (SVGs originales mejorados)
const mascotas = [
  {
    name: 'Whiskers',
    type: 'Gato',
    superPower: 'Sigilo',
    svg: `<svg width="1000" height="1000" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="115" rx="48" ry="32" fill="#D1D5DB" stroke="#888" stroke-width="4"/>
      <path d="M125 135 Q155 120 120 110 Q145 140 110 120" stroke="#888" stroke-width="6" fill="none"/>
      <ellipse cx="90" cy="70" rx="36" ry="30" fill="#D1D5DB" stroke="#888" stroke-width="4"/>
      <polygon points="68,52 78,18 90,55" fill="#D1D5DB" stroke="#888" stroke-width="4"/>
      <polygon points="112,52 124,18 90,55" fill="#D1D5DB" stroke="#888" stroke-width="4"/>
      <ellipse cx="75" cy="90" rx="6" ry="4" fill="#F99"/>
      <ellipse cx="105" cy="90" rx="6" ry="4" fill="#F99"/>
      <ellipse cx="90" cy="95" rx="10" ry="7" fill="#fff" stroke="#888" stroke-width="2"/>
      <ellipse cx="90" cy="98" rx="2.5" ry="1.5" fill="#E55"/>
      <ellipse class="ojo ojo-izquierdo" cx="80" cy="77" rx="7" ry="9" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="ojo ojo-derecho" cx="100" cy="77" rx="7" ry="9" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="pupila pupila-izquierda" cx="80" cy="79" rx="2.5" ry="3.5" fill="#333"/>
      <ellipse class="pupila pupila-derecha" cx="100" cy="79" rx="2.5" ry="3.5" fill="#333"/>
      <path d="M75 68 Q80 72 85 68" stroke="#888" stroke-width="2" fill="none"/>
      <path d="M95 68 Q100 72 105 68" stroke="#888" stroke-width="2" fill="none"/>
      <path d="M87 104 Q90 108 93 104" stroke="#E55" stroke-width="2" fill="none"/>
      <line x1="85" y1="98" x2="60" y2="100" stroke="#888" stroke-width="1.5"/>
      <line x1="85" y1="101" x2="60" y2="110" stroke="#888" stroke-width="1.5"/>
      <line x1="85" y1="95" x2="60" y2="90" stroke="#888" stroke-width="1.5"/>
      <line x1="95" y1="98" x2="120" y2="100" stroke="#888" stroke-width="1.5"/>
      <line x1="95" y1="101" x2="120" y2="110" stroke="#888" stroke-width="1.5"/>
      <line x1="95" y1="95" x2="120" y2="90" stroke="#888" stroke-width="1.5"/>
    </svg>`
  },
  {
    name: 'Bolt',
    type: 'Perro',
    superPower: 'Velocidad',
    svg: `<svg width="260" height="230" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="110" rx="55" ry="38" fill="#F9E4B7" stroke="#333" stroke-width="4"/>
      <ellipse cx="90" cy="70" rx="45" ry="38" fill="#F9E4B7" stroke="#333" stroke-width="4"/>
      <ellipse cx="60" cy="55" rx="13" ry="16" fill="#B8865B" stroke="#333" stroke-width="3"/>
      <ellipse cx="120" cy="55" rx="13" ry="16" fill="#B8865B" stroke="#333" stroke-width="3"/>
      <ellipse cx="90" cy="90" rx="22" ry="16" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse cx="90" cy="95" rx="6" ry="4" fill="#333"/>
      <ellipse cx="90" cy="105" rx="7" ry="4" fill="#F99"/>
      <ellipse class="ojo ojo-izquierdo" cx="75" cy="75" rx="7" ry="10" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="ojo ojo-derecho" cx="105" cy="75" rx="7" ry="10" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="pupila pupila-izquierda" cx="75" cy="77" rx="3" ry="4" fill="#333"/>
      <ellipse class="pupila pupila-derecha" cx="105" cy="77" rx="3" ry="4" fill="#333"/>
      <path d="M70 65 Q75 70 80 65" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M100 65 Q105 70 110 65" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M85 102 Q90 110 95 102" stroke="#e55" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    name: 'Fluffy',
    type: 'Conejo',
    superPower: 'Saltos',
    svg: `<svg width="260" height="230" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="110" rx="50" ry="35" fill="#fff" stroke="#B97A56" stroke-width="4"/>
      <ellipse cx="90" cy="70" rx="40" ry="34" fill="#fff" stroke="#B97A56" stroke-width="4"/>
      <rect x="65" y="5" width="12" height="40" rx="6" fill="#fff" stroke="#B97A56" stroke-width="3"/>
      <rect x="103" y="5" width="12" height="40" rx="6" fill="#fff" stroke="#B97A56" stroke-width="3"/>
      <ellipse cx="72" cy="90" rx="7" ry="5" fill="#F99"/>
      <ellipse cx="108" cy="90" rx="7" ry="5" fill="#F99"/>
      <ellipse cx="90" cy="95" rx="14" ry="10" fill="#fff" stroke="#B97A56" stroke-width="2"/>
      <ellipse cx="90" cy="98" rx="3" ry="2" fill="#E55"/>
      <rect x="87" y="104" width="6" height="8" rx="2" fill="#fff" stroke="#B97A56" stroke-width="1"/>
      <line x1="90" y1="104" x2="90" y2="112" stroke="#B97A56" stroke-width="1"/>
      <ellipse class="ojo ojo-izquierdo" cx="80" cy="75" rx="6" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="ojo ojo-derecho" cx="100" cy="75" rx="6" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="pupila pupila-izquierda" cx="80" cy="77" rx="2.5" ry="3" fill="#333"/>
      <ellipse class="pupila pupila-derecha" cx="100" cy="77" rx="2.5" ry="3" fill="#333"/>
      <path d="M75 65 Q80 70 85 65" stroke="#B97A56" stroke-width="2" fill="none"/>
      <path d="M95 65 Q100 70 105 65" stroke="#B97A56" stroke-width="2" fill="none"/>
      <path d="M87 105 Q90 110 93 105" stroke="#E55" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    name: 'Hammy',
    type: 'Hámster',
    superPower: 'Escapismo',
    svg: `<svg width="260" height="230" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="110" rx="50" ry="35" fill="#F9D29D" stroke="#B97A56" stroke-width="4"/>
      <ellipse cx="90" cy="70" rx="40" ry="34" fill="#F9D29D" stroke="#B97A56" stroke-width="4"/>
      <ellipse cx="60" cy="38" rx="12" ry="12" fill="#fff" stroke="#B97A56" stroke-width="3"/>
      <ellipse cx="120" cy="38" rx="12" ry="12" fill="#fff" stroke="#B97A56" stroke-width="3"/>
      <ellipse cx="70" cy="90" rx="8" ry="6" fill="#F99"/>
      <ellipse cx="110" cy="90" rx="8" ry="6" fill="#F99"/>
      <ellipse cx="90" cy="95" rx="14" ry="10" fill="#fff" stroke="#B97A56" stroke-width="2"/>
      <rect x="85" y="102" width="10" height="8" rx="2" fill="#fff" stroke="#B97A56" stroke-width="1"/>
      <line x1="90" y1="102" x2="90" y2="110" stroke="#B97A56" stroke-width="1"/>
      <ellipse cx="90" cy="98" rx="3" ry="2" fill="#E55"/>
      <ellipse class="ojo ojo-izquierdo" cx="78" cy="75" rx="6" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="ojo ojo-derecho" cx="102" cy="75" rx="6" ry="8" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="pupila pupila-izquierda" cx="78" cy="77" rx="2.5" ry="3" fill="#333"/>
      <ellipse class="pupila pupila-derecha" cx="102" cy="77" rx="2.5" ry="3" fill="#333"/>
      <path d="M72 65 Q78 70 84 65" stroke="#B97A56" stroke-width="2" fill="none"/>
      <path d="M96 65 Q102 70 108 65" stroke="#B97A56" stroke-width="2" fill="none"/>
      <path d="M87 105 Q90 110 93 105" stroke="#E55" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    name: 'Spirit',
    type: 'Caballo',
    superPower: 'Fuerza',
    svg: `<svg width="260" height="230" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="120" rx="55" ry="32" fill="#D2B48C" stroke="#333" stroke-width="4"/>
      <ellipse cx="90" cy="70" rx="38" ry="32" fill="#D2B48C" stroke="#333" stroke-width="4"/>
      <path d="M70 45 Q60 60 80 60 Q70 50 90 50 Q80 55 110 55 Q100 45 110 45" fill="#8B5C2A" stroke="#333" stroke-width="2"/>
      <ellipse cx="65" cy="35" rx="8" ry="18" fill="#D2B48C" stroke="#333" stroke-width="2"/>
      <ellipse cx="115" cy="35" rx="8" ry="18" fill="#D2B48C" stroke="#333" stroke-width="2"/>
      <ellipse cx="90" cy="95" rx="18" ry="12" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse cx="85" cy="98" rx="3" ry="2" fill="#333"/>
      <ellipse cx="95" cy="98" rx="3" ry="2" fill="#333"/>
      <ellipse class="ojo ojo-izquierdo" cx="80" cy="75" rx="6" ry="9" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="ojo ojo-derecho" cx="100" cy="75" rx="6" ry="9" fill="#fff" stroke="#333" stroke-width="2"/>
      <ellipse class="pupila pupila-izquierda" cx="80" cy="77" rx="2.5" ry="3.5" fill="#333"/>
      <ellipse class="pupila pupila-derecha" cx="100" cy="77" rx="2.5" ry="3.5" fill="#333"/>
      <path d="M75 65 Q80 70 85 65" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M95 65 Q100 70 105 65" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M87 102 Q90 108 93 102" stroke="#e55" stroke-width="2" fill="none"/>
    </svg>`
  }
];

let actual = 0;

function renderCarrusel() {
  const viewport = document.getElementById('carruselViewport');
  viewport.innerHTML = '';
  const m = mascotas[actual];
  const card = document.createElement('div');
  card.className = 'carrusel-card';
  card.innerHTML = `
    ${m.svg}
    <div class='mascota-nombre'>${m.name}</div>
    <div class='mascota-dato'><b>Tipo:</b> ${m.type}</div>
    <div class='mascota-superpoder'><b>Poder:</b> ${m.superPower}</div>
    <button class='main-btn' onclick='seleccionarMascota(${actual})'>¡Elegir esta mascota!</button>
  `;
  viewport.appendChild(card);
  renderIndicadores();
}

function renderIndicadores() {
  const ind = document.getElementById('carruselIndicadores');
  ind.innerHTML = '';
  for (let i = 0; i < mascotas.length; i++) {
    const punto = document.createElement('div');
    punto.className = 'carrusel-indicador' + (i === actual ? ' activo' : '');
    punto.onclick = () => { actual = i; renderCarrusel(); };
    ind.appendChild(punto);
  }
}

document.getElementById('carruselPrev').onclick = () => {
  actual = (actual - 1 + mascotas.length) % mascotas.length;
  renderCarrusel();
};
document.getElementById('carruselNext').onclick = () => {
  actual = (actual + 1) % mascotas.length;
  renderCarrusel();
};

function seleccionarMascota(idx) {
  const mascota = mascotas[idx];
  const heroeId = localStorage.getItem('heroeSeleccionado');
  const token = localStorage.getItem('gameToken');
  if (!heroeId || !token) {
    alert('Debes seleccionar un héroe primero.');
    window.location.href = 'elegir.html';
    return;
  }
  // 1. Crear la mascota en el backend
  fetch('/api/pets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      name: mascota.name,
      type: mascota.type,
      superPower: mascota.superPower,
      owner: null,
      heroId: heroeId
    })
  })
  .then(res => res.json())
  .then(pet => {
    if (!pet._id) {
      alert('Error al crear la mascota');
      return;
    }
    // 2. Adoptar la mascota
    fetch(`/api/heroes/${heroeId}/adoptar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ petId: pet._id })
    })
    .then(res => res.json())
    .then(async data => {
      if (data.error) {
        alert('Error al adoptar mascota: ' + data.error);
        return;
      }
      localStorage.setItem('mascotaSeleccionada', pet._id);
      // Guardar selección en el backend
      try {
        await fetch('/api/user/seleccionar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ petId: pet._id })
        });
      } catch {}
      window.location.href = 'home.html';
    })
    .catch(err => {
      alert('Error al adoptar mascota: ' + err.message);
    });
  })
  .catch(err => {
    alert('Error al crear la mascota: ' + err.message);
  });
}

// Animación de parpadeo de ojos para los SVG del carrusel
function parpadearOjosCarrusel() {
  const card = document.querySelector('.carrusel-card');
  if (!card) return;
  const ojos = card.querySelectorAll('.ojo');
  if (ojos.length === 0) return;
  // Guardar los valores originales de rx y ry
  ojos.forEach(ojo => {
    if (!ojo.dataset.rx) {
      ojo.dataset.rx = ojo.getAttribute('rx');
      ojo.dataset.ry = ojo.getAttribute('ry');
    }
  });
  // Cerrar ojos (parpadeo)
  ojos.forEach(ojo => {
    ojo.setAttribute('ry', 1.5); // Simula ojo cerrado
  });
  setTimeout(() => {
    // Abrir ojos
    ojos.forEach(ojo => {
      ojo.setAttribute('ry', ojo.dataset.ry);
    });
  }, 180);
}

// Lanzar parpadeo cada 3 segundos al cambiar de mascota
setInterval(parpadearOjosCarrusel, 3000);
// También al renderizar una nueva mascota
const oldRenderCarrusel = renderCarrusel;
renderCarrusel = function() {
  oldRenderCarrusel();
  setTimeout(parpadearOjosCarrusel, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
renderCarrusel(); 
});

function isValid(val) {
  return val && val !== 'null' && val !== 'undefined' && val !== '';
}
const token = localStorage.getItem('gameToken');
const heroe = localStorage.getItem('heroeSeleccionado');
const mascota = localStorage.getItem('mascotaSeleccionada');
if (!isValid(token)) {
  window.location.href = 'index.html';
} else if (!isValid(heroe)) {
  window.location.href = 'elegir.html';
} else if (isValid(heroe) && isValid(mascota)) {
  window.location.href = 'home.html';
}
// Si solo tiene héroe, se queda en elegirMascota.html 