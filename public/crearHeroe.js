// HeroPet Legends - Editor visual de héroe

function heroSVGFullEditor({ suit, cape, accessory }) {
  return `
  <svg width="600" height="900" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;">
    ${cape ? `<path d="M50 180 Q90 240 130 180 Q110 210 70 180 Z" fill="${cape}" opacity="0.7">
      <animate attributeName="d" values="M50 180 Q90 240 130 180 Q110 210 70 180 Z;M50 180 Q90 250 130 180 Q110 220 70 180 Z;M50 180 Q90 240 130 180 Q110 210 70 180 Z" dur="1.2s" repeatCount="indefinite"/></path>` : ''}
    <rect x="70" y="210" width="12" height="40" rx="6" fill="${suit}">
      <animateTransform attributeName="transform" type="rotate" values="-10 76 210; 10 76 210; -10 76 210" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="98" y="210" width="12" height="40" rx="6" fill="${suit}">
      <animateTransform attributeName="transform" type="rotate" values="10 104 210; -10 104 210; 10 104 210" dur="1s" repeatCount="indefinite"/>
    </rect>
    <ellipse cx="90" cy="160" rx="38" ry="55" fill="${suit}"/>
    <rect x="65" y="200" width="50" height="10" rx="5" fill="#ffd600"/>
    <ellipse cx="90" cy="160" rx="15" ry="13" fill="#ffd600" stroke="#e53935" stroke-width="2"/>
    <text x="90" y="165" text-anchor="middle" font-size="16" font-family="Arial" fill="#e53935" font-weight="bold">S</text>
    <ellipse cx="90" cy="110" rx="28" ry="30" fill="#fff" stroke="${suit}" stroke-width="4"/>
    <ellipse cx="80" cy="112" rx="4" ry="7" fill="#222"/>
    <ellipse cx="100" cy="112" rx="4" ry="7" fill="#222"/>
    <path d="M80 125 Q90 135 100 125" stroke="#222" stroke-width="3" fill="none"/>
    <rect x="40" y="150" width="15" height="50" rx="7" fill="${suit}">
      <animateTransform attributeName="transform" type="rotate" values="-20 47 150; 20 47 150; -20 47 150" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="125" y="150" width="15" height="50" rx="7" fill="${suit}">
      <animateTransform attributeName="transform" type="rotate" values="20 132 150; -20 132 150; 20 132 150" dur="1s" repeatCount="indefinite"/>
    </rect>
    ${accessory === 'antifaz' ? '<rect x="72" y="105" width="36" height="12" rx="6" fill="#607d8b"/>' : ''}
    ${accessory === 'bufanda' ? '<rect x="80" y="185" width="20" height="8" rx="4" fill="#fff"/>' : ''}
    ${accessory === 'casco' ? '<ellipse cx="90" cy="90" rx="18" ry="10" fill="#bdbdbd"/>' : ''}
    ${accessory === 'varita' ? '<rect x="120" y="210" width="6" height="30" rx="3" fill="#00e676"/>' : ''}
    ${accessory === 'estrella' ? '<polygon points="90,80 94,92 108,92 96,100 100,112 90,105 80,112 84,100 72,92 86,92" fill="#ffd600"/>' : ''}
    ${accessory === 'hoja' ? '<ellipse cx="90" cy="80" rx="8" ry="16" fill="#cddc39"/>' : ''}
  </svg>`;
}

function updateHeroAvatar() {
  const suit = document.getElementById('heroSuitColor').value;
  const cape = document.getElementById('heroCapeColor').value;
  const accessory = document.getElementById('heroAccessory').value;
  document.getElementById('heroEditorAvatar').innerHTML = heroSVGFullEditor({ suit, cape: accessory === 'capa' ? cape : '', accessory });
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeroAvatar();
  document.getElementById('heroSuitColor').oninput = updateHeroAvatar;
  document.getElementById('heroCapeColor').oninput = updateHeroAvatar;
  document.getElementById('heroAccessory').onchange = updateHeroAvatar;

  document.getElementById('heroForm').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('heroName').value;
    const alias = document.getElementById('heroAlias').value;
    const city = document.getElementById('heroCity').value;
    const team = document.getElementById('heroTeam').value;
    const suit = document.getElementById('heroSuitColor').value;
    const cape = document.getElementById('heroCapeColor').value;
    const accessory = document.getElementById('heroAccessory').value;
    const token = localStorage.getItem('gameToken');
    const body = {
      name,
      alias,
      city,
      team,
      suitColor: suit,
      capeColor: accessory === 'capa' ? cape : '',
      accessory
    };
    try {
      const res = await fetch('/api/heroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const data = await res.json();
        document.getElementById('heroFormMsg').textContent = data.error || 'No se pudo crear el héroe.';
        return;
      }
      const hero = await res.json();
      localStorage.setItem('heroeSeleccionado', hero._id);
      console.log('heroeSeleccionado guardado:', hero._id);
      document.getElementById('heroFormMsg').style.color = '#4ecdc4';
      document.getElementById('heroFormMsg').textContent = '¡Héroe creado exitosamente!';
      setTimeout(() => {
        window.location.href = 'elegirMascota.html';
      }, 1200);
    } catch (err) {
      document.getElementById('heroFormMsg').textContent = 'Error de conexión.';
    }
  };
}); 