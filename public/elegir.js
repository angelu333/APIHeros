// HeroPet Legends - Selección de héroe predefinido (avatar grande animado)

const HERO_COLORS = {
  ThunderMan: { suit: '#1976d2', cape: '#e53935', accessory: 'capa' },
  AquaGirl: { suit: '#00bcd4', cape: '#1976d2', accessory: 'capa' },
  Shadow: { suit: '#222', cape: '#607d8b', accessory: 'antifaz' },
  Blaze: { suit: '#e53935', cape: '#ffd600', accessory: 'capa' },
  Windy: { suit: '#81d4fa', cape: '#fff', accessory: 'bufanda' },
  'Iron Paw': { suit: '#bdbdbd', cape: '#ff6f00', accessory: 'casco' },
  Mystic: { suit: '#8e24aa', cape: '#00e676', accessory: 'varita' },
  Volt: { suit: '#ffd600', cape: '#1976d2', accessory: 'capa' },
  Nova: { suit: '#ffb300', cape: '#00bcd4', accessory: 'estrella' },
  Leaf: { suit: '#43a047', cape: '#cddc39', accessory: 'hoja' }
};

function heroSVG(hero) {
  const c = HERO_COLORS[hero.name] || { suit: '#1976d2', cape: '#e53935', accessory: null };
  return `
  <svg width="80" height="80" viewBox="0 0 80 80">
    <ellipse cx="40" cy="60" rx="18" ry="16" fill="${c.suit}"/>
    <ellipse cx="40" cy="38" rx="13" ry="13" fill="#fff" stroke="${c.suit}" stroke-width="2"/>
    <ellipse cx="36" cy="38" rx="2" ry="3" fill="#222"/>
    <ellipse cx="44" cy="38" rx="2" ry="3" fill="#222"/>
    <path d="M36 44 Q40 48 44 44" stroke="#222" stroke-width="2" fill="none"/>
    ${c.cape ? `<path d="M22 60 Q40 75 58 60 Q50 70 30 60 Z" fill="${c.cape}" opacity="0.7"/>` : ''}
    ${c.accessory === 'antifaz' ? '<rect x="32" y="35" width="16" height="6" rx="3" fill="#607d8b"/>' : ''}
    ${c.accessory === 'bufanda' ? '<rect x="35" y="55" width="10" height="5" rx="2.5" fill="#fff"/>' : ''}
    ${c.accessory === 'casco' ? '<ellipse cx="40" cy="32" rx="10" ry="6" fill="#bdbdbd"/>' : ''}
    ${c.accessory === 'varita' ? '<rect x="50" y="65" width="3" height="12" rx="1.5" fill="#00e676"/>' : ''}
    ${c.accessory === 'estrella' ? '<polygon points="40,25 42,32 49,32 43,36 45,43 40,39 35,43 37,36 31,32 38,32" fill="#ffd600"/>' : ''}
    ${c.accessory === 'hoja' ? '<ellipse cx="40" cy="25" rx="4" ry="8" fill="#cddc39"/>' : ''}
  </svg>`;
}

function heroSVGFull(hero) {
  const c = HERO_COLORS[hero.name] || { suit: '#1976d2', cape: '#e53935', accessory: null };
  return `
  <svg width="180" height="260" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Capa -->
    ${c.cape ? `<path d="M50 180 Q90 240 130 180 Q110 210 70 180 Z" fill="${c.cape}" opacity="0.7">
      <animate attributeName="d" values="M50 180 Q90 240 130 180 Q110 210 70 180 Z;M50 180 Q90 250 130 180 Q110 220 70 180 Z;M50 180 Q90 240 130 180 Q110 210 70 180 Z" dur="1.2s" repeatCount="indefinite"/></path>` : ''}
    <!-- Piernas -->
    <rect x="70" y="210" width="12" height="40" rx="6" fill="${c.suit}">
      <animateTransform attributeName="transform" type="rotate" values="-10 76 210; 10 76 210; -10 76 210" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="98" y="210" width="12" height="40" rx="6" fill="${c.suit}">
      <animateTransform attributeName="transform" type="rotate" values="10 104 210; -10 104 210; 10 104 210" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Cuerpo -->
    <ellipse cx="90" cy="160" rx="38" ry="55" fill="${c.suit}"/>
    <!-- Cinturón -->
    <rect x="65" y="200" width="50" height="10" rx="5" fill="#ffd600"/>
    <!-- S en el pecho -->
    <ellipse cx="90" cy="160" rx="15" ry="13" fill="#ffd600" stroke="#e53935" stroke-width="2"/>
    <text x="90" y="165" text-anchor="middle" font-size="16" font-family="Arial" fill="#e53935" font-weight="bold">S</text>
    <!-- Cabeza -->
    <ellipse cx="90" cy="110" rx="28" ry="30" fill="#fff" stroke="${c.suit}" stroke-width="4"/>
    <!-- Ojos -->
    <ellipse cx="80" cy="112" rx="4" ry="7" fill="#222"/>
    <ellipse cx="100" cy="112" rx="4" ry="7" fill="#222"/>
    <!-- Boca -->
    <path d="M80 125 Q90 135 100 125" stroke="#222" stroke-width="3" fill="none"/>
    <!-- Brazos -->
    <rect x="40" y="150" width="15" height="50" rx="7" fill="${c.suit}">
      <animateTransform attributeName="transform" type="rotate" values="-20 47 150; 20 47 150; -20 47 150" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="125" y="150" width="15" height="50" rx="7" fill="${c.suit}">
      <animateTransform attributeName="transform" type="rotate" values="20 132 150; -20 132 150; 20 132 150" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Accesorios -->
    ${c.accessory === 'antifaz' ? '<rect x="72" y="105" width="36" height="12" rx="6" fill="#607d8b"/>' : ''}
    ${c.accessory === 'bufanda' ? '<rect x="80" y="185" width="20" height="8" rx="4" fill="#fff"/>' : ''}
    ${c.accessory === 'casco' ? '<ellipse cx="90" cy="90" rx="18" ry="10" fill="#bdbdbd"/>' : ''}
    ${c.accessory === 'varita' ? '<rect x="120" y="210" width="6" height="30" rx="3" fill="#00e676"/>' : ''}
    ${c.accessory === 'estrella' ? '<polygon points="90,80 94,92 108,92 96,100 100,112 90,105 80,112 84,100 72,92 86,92" fill="#ffd600"/>' : ''}
    ${c.accessory === 'hoja' ? '<ellipse cx="90" cy="80" rx="8" ry="16" fill="#cddc39"/>' : ''}
  </svg>`;
}

async function fetchUserHeroes() {
  const token = localStorage.getItem('gameToken');
  const res = await fetch('/api/heroes', { headers: { Authorization: 'Bearer ' + token } });
  return await res.json();
}

function renderCarousel(items, containerId, svgFn, onSelect, selectedId) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'carousel-item' + (item._id === selectedId ? ' selected' : '');
    div.innerHTML = svgFn(item) + `<div class="item-label">${item.name}</div>`;
    div.onclick = () => onSelect(item);
    cont.appendChild(div);
  });
}

function renderAvatarPreview(item, svgFn, previewId) {
  const cont = document.getElementById(previewId);
  cont.innerHTML = svgFn(item);
}

function seleccionarHeroe(heroId) {
  // Guardar el héroe seleccionado en localStorage o donde corresponda
  localStorage.setItem('heroeSeleccionado', heroId);
  // Redirigir a la pantalla de elegir/crear mascota
  window.location.href = 'elegirMascota.html';
}

let selectedHero = null;
let heroes = [];

async function main() {
  heroes = await fetchUserHeroes();
  selectedHero = heroes[0];
  renderAll();
}

function renderAll() {
  renderCarousel(heroes, 'heroesCarousel', heroSVG, hero => {
    selectedHero = hero;
    renderAll();
  }, selectedHero?._id);
  renderAvatarPreview(selectedHero, heroSVGFull, 'heroAvatarPreview');
}

document.addEventListener('DOMContentLoaded', () => {
  main();
  document.getElementById('confirmarSeleccion').onclick = async () => {
    if (!selectedHero) return alert('Selecciona un héroe');
    localStorage.setItem('heroeSeleccionado', selectedHero._id);
    // Guardar selección en el backend
    const token = localStorage.getItem('gameToken');
    try {
      await fetch('/api/user/seleccionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ heroId: selectedHero._id })
      });
    } catch {}
    window.location.href = 'elegirMascota.html';
  };
}); 