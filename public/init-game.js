// Script de inicialización del juego
// Este script se ejecuta una sola vez para dar monedas y comida inicial

function inicializarJuego() {
  // Verificar si ya se inicializó
  if (localStorage.getItem('juegoInicializado')) {
    console.log('El juego ya fue inicializado anteriormente');
    return;
  }

  console.log('Inicializando juego...');

  // Dar monedas iniciales
  const monedasIniciales = 100;
  localStorage.setItem('monedas', monedasIniciales);
  console.log(`Monedas iniciales: ${monedasIniciales}`);

  // Dar comida inicial
  const inventarioInicial = {
    'manzana': 3,
    'galleta': 2,
    'pizza': 1,
    'pastel': 0,
    'zanahoria': 2,
    'carne': 0
  };
  localStorage.setItem('inventario', JSON.stringify(inventarioInicial));
  console.log('Inventario inicial creado:', inventarioInicial);

  // Marcar como inicializado
  localStorage.setItem('juegoInicializado', 'true');
  console.log('¡Juego inicializado exitosamente!');
  
  // Mostrar mensaje al usuario
  mostrarMensajeInicial();
}

function mostrarMensajeInicial() {
  // Crear modal de bienvenida
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  
  const contenido = document.createElement('div');
  contenido.style.cssText = `
    background: linear-gradient(135deg, #1a2340, #23243a);
    color: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  `;
  
  contenido.innerHTML = `
    <h2 style="color: #00c6ff; margin-bottom: 1rem;">🎉 ¡Bienvenido a HeroPet Legends!</h2>
    <p style="margin-bottom: 1rem;">Tu juego ha sido inicializado con:</p>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
      <p>🪙 <strong>100 Monedas</strong> para comprar comida</p>
      <p>📦 <strong>Comida inicial</strong> en tu inventario</p>
    </div>
    <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 1rem;">
      ¡Ve a los minijuegos a ganar más monedas y a la tienda a comprar comida!
    </p>
    <button onclick="this.parentElement.parentElement.remove()" style="
      background: linear-gradient(135deg, #00c6ff, #0072ff);
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      font-size: 1.1rem;
    ">¡Entendido!</button>
  `;
  
  modal.appendChild(contenido);
  document.body.appendChild(modal);
}

// Función para reinicializar el juego (útil para testing)
function reinicializarJuego() {
  localStorage.removeItem('juegoInicializado');
  localStorage.removeItem('monedas');
  localStorage.removeItem('inventario');
  console.log('Juego reinicializado. Ejecuta inicializarJuego() para empezar de nuevo.');
}

// Función para agregar monedas de prueba
function agregarMonedasPrueba(cantidad = 50) {
  const monedasActuales = parseInt(localStorage.getItem('monedas') || 0);
  const nuevasMonedas = monedasActuales + cantidad;
  localStorage.setItem('monedas', nuevasMonedas);
  console.log(`Monedas agregadas: ${cantidad}. Total: ${nuevasMonedas}`);
  
  // Actualizar display si existe
  const monedasDisplay = document.getElementById('monedasCantidad');
  if (monedasDisplay) {
    monedasDisplay.textContent = nuevasMonedas;
  }
}

// Función para agregar comida de prueba
function agregarComidaPrueba(tipo, cantidad = 1) {
  const inventario = JSON.parse(localStorage.getItem('inventario') || '{}');
  inventario[tipo] = (inventario[tipo] || 0) + cantidad;
  localStorage.setItem('inventario', JSON.stringify(inventario));
  console.log(`Comida agregada: ${cantidad} ${tipo}. Total: ${inventario[tipo]}`);
}

// Ejecutar inicialización automáticamente si no se ha hecho
if (!localStorage.getItem('juegoInicializado')) {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarJuego);
  } else {
    inicializarJuego();
  }
}

// Exponer funciones globalmente para uso en consola
window.inicializarJuego = inicializarJuego;
window.reinicializarJuego = reinicializarJuego;
window.agregarMonedasPrueba = agregarMonedasPrueba;
window.agregarComidaPrueba = agregarComidaPrueba; 