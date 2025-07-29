// Referencias a los elementos
const tipoMascota = document.getElementById('tipoMascota');
const nombreMascota = document.getElementById('nombreMascota');
const superPoderMascota = document.getElementById('superPoderMascota');
const avatarMascotaPreview = document.getElementById('avatarMascotaPreview');
const mascotaDatosPreview = document.getElementById('mascotaDatosPreview');
const formCrearMascota = document.getElementById('formCrearMascota');

let parpadeando = false;

function renderMascotaIMG(tipo) {
  // Imagen base
  let img = `<img src="img/mascotas/${tipo}.svg" alt="${tipo}" style="width:180px;max-height:160px;position:relative;z-index:1;">`;
  // Parpadeo: superponer "párpados" SVG si parpadeando
  let parpadeoSVG = '';
  if (parpadeando) {
    // Posiciones aproximadas para los ojos de cada animal
    let ojos = {
      perro: {x1:75, y1:77, x2:105, y2:77},
      gato: {x1:80, y1:77, x2:100, y2:77},
      conejo: {x1:80, y1:77, x2:100, y2:77},
      caballo: {x1:80, y1:77, x2:100, y2:77},
      hamster: {x1:78, y1:77, x2:102, y2:77}
    };
    let o = ojos[tipo] || ojos['gato'];
    parpadeoSVG = `<svg style='position:absolute;left:0;top:0;pointer-events:none;' width='180' height='160'>
      <ellipse cx='${o.x1}' cy='${o.y1}' rx='7' ry='9' fill='black'/>
      <ellipse cx='${o.x2}' cy='${o.y2}' rx='7' ry='9' fill='black'/>
    </svg>`;
    return `<div style='position:relative;width:180px;height:160px;'>${img}${parpadeoSVG}</div>`;
  }
  return img;
}

function actualizarAvatar() {
  avatarMascotaPreview.innerHTML = renderMascotaIMG(tipoMascota.value);
  mascotaDatosPreview.innerHTML =
    `<div style='font-size:1.2rem;font-weight:bold;'>${nombreMascota.value || 'Nombre'}</div>`+
    `<div style='font-size:1rem;'>Superpoder: ${superPoderMascota.value || '...'}</div>`;
}
tipoMascota.addEventListener('change', actualizarAvatar);
nombreMascota.addEventListener('input', actualizarAvatar);
superPoderMascota.addEventListener('input', actualizarAvatar);
document.addEventListener('DOMContentLoaded', actualizarAvatar);

// Animación de parpadeo
setInterval(() => {
  parpadeando = true;
  actualizarAvatar();
  setTimeout(() => {
    parpadeando = false;
    actualizarAvatar();
  }, 120);
}, 2600);

formCrearMascota.onsubmit = async function(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const heroeSeleccionado = localStorage.getItem('heroeSeleccionado');
  console.log('heroeSeleccionado leído en crearMascota:', heroeSeleccionado);
  if (!token || !heroeSeleccionado) {
    alert('Debes seleccionar un héroe primero.');
    window.location.href = 'elegir.html';
    return;
  }
  const data = {
    name: nombreMascota.value,
    type: tipoMascota.value,
    superPower: superPoderMascota.value,
    owner: null,
    heroId: heroeSeleccionado
  };
  try {
    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear la mascota');
    const pet = await res.json();
    // Adoptar la mascota
    const adoptarRes = await fetch(`/api/heroes/${heroeSeleccionado}/adoptar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ petId: pet._id })
    });
    const adoptarData = await adoptarRes.json();
    if (!adoptarRes.ok || adoptarData.error) throw new Error(adoptarData.error || 'Error al adoptar mascota');
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
  } catch (err) {
    alert('Error al crear o adoptar la mascota: ' + err.message);
  }
}; 