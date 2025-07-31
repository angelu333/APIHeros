// Generador de ladrido de perro realista
function createDogBark() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear múltiples osciladores para un sonido más complejo
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const oscillator3 = audioContext.createOscillator();
    
    // Crear filtros para dar forma al sonido
    const filter1 = audioContext.createBiquadFilter();
    const filter2 = audioContext.createBiquadFilter();
    const filter3 = audioContext.createBiquadFilter();
    
    // Crear nodos de ganancia para controlar el volumen
    const gain1 = audioContext.createGain();
    const gain2 = audioContext.createGain();
    const gain3 = audioContext.createGain();
    const masterGain = audioContext.createGain();
    
    // Configurar filtros
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(800, audioContext.currentTime);
    filter1.Q.setValueAtTime(1, audioContext.currentTime);
    
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1200, audioContext.currentTime);
    filter2.Q.setValueAtTime(2, audioContext.currentTime);
    
    filter3.type = 'highpass';
    filter3.frequency.setValueAtTime(400, audioContext.currentTime);
    filter3.Q.setValueAtTime(1, audioContext.currentTime);
    
    // Configurar osciladores
    oscillator1.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    oscillator1.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.2);
    oscillator1.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
    
    oscillator2.type = 'square';
    oscillator2.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    oscillator2.frequency.exponentialRampToValueAtTime(700, audioContext.currentTime + 0.2);
    oscillator2.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
    
    oscillator3.type = 'triangle';
    oscillator3.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator3.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
    oscillator3.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
    oscillator3.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.3);
    
    // Configurar ganancias
    gain1.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    gain2.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    gain3.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    masterGain.gain.setValueAtTime(0.4, audioContext.currentTime);
    
    // Conectar todo
    oscillator1.connect(filter1);
    oscillator2.connect(filter2);
    oscillator3.connect(filter3);
    
    filter1.connect(gain1);
    filter2.connect(gain2);
    filter3.connect(gain3);
    
    gain1.connect(masterGain);
    gain2.connect(masterGain);
    gain3.connect(masterGain);
    
    masterGain.connect(audioContext.destination);
    
    // Reproducir
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator3.start(audioContext.currentTime);
    
    oscillator1.stop(audioContext.currentTime + 0.4);
    oscillator2.stop(audioContext.currentTime + 0.4);
    oscillator3.stop(audioContext.currentTime + 0.4);
    
  } catch (error) {
    console.log('No se pudo reproducir el ladrido:', error);
  }
}

// Función para reproducir ladrido con delay
function playDogBark(delay = 0) {
  setTimeout(() => {
    createDogBark();
  }, delay);
}

// Exportar para uso global
window.playDogBark = playDogBark;
window.createDogBark = createDogBark; 