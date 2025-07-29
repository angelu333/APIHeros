// HeroPet Legends - Animación de personajes voladores (mejorados)

// SVG de Superman cartoon volando horizontal (más estilizado)
const supermanSVG = `
<svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Capa roja -->
    <path d="M30 60 Q90 80 170 40 Q120 70 60 50 Z" fill="#e53935" opacity="0.8">
        <animate attributeName="d" values="M30 60 Q90 80 170 40 Q120 70 60 50 Z;M30 60 Q90 90 170 30 Q120 80 60 50 Z;M30 60 Q90 80 170 40 Q120 70 60 50 Z" dur="1.2s" repeatCount="indefinite"/>
    </path>
    <!-- Cuerpo azul -->
    <rect x="70" y="40" width="50" height="18" rx="9" fill="#1976d2"/>
    <!-- Cinturón amarillo -->
    <rect x="105" y="54" width="15" height="6" rx="3" fill="#ffd600"/>
    <!-- S en el pecho -->
    <ellipse cx="85" cy="49" rx="7" ry="6" fill="#ffd600" stroke="#e53935" stroke-width="2"/>
    <text x="85" y="53" text-anchor="middle" font-size="10" font-family="Arial" fill="#e53935" font-weight="bold">S</text>
    <!-- Cabeza -->
    <ellipse cx="70" cy="49" rx="11" ry="12" fill="#fff" stroke="#1976d2" stroke-width="3"/>
    <!-- Ojos -->
    <ellipse cx="67" cy="50" rx="2" ry="3" fill="#222"/>
    <ellipse cx="73" cy="50" rx="2" ry="3" fill="#222"/>
    <!-- Boca -->
    <path d="M67 56 Q70 59 73 56" stroke="#222" stroke-width="2" fill="none"/>
    <!-- Brazo delantero -->
    <rect x="35" y="45" width="35" height="7" rx="3.5" fill="#1976d2">
        <animateTransform attributeName="transform" type="rotate" values="-15 35 48; 15 35 48; -15 35 48" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Brazo trasero -->
    <rect x="120" y="50" width="25" height="7" rx="3.5" fill="#1976d2">
        <animateTransform attributeName="transform" type="rotate" values="15 145 53; -15 145 53; 15 145 53" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Piernas -->
    <rect x="110" y="62" width="8" height="18" rx="4" fill="#1976d2">
        <animateTransform attributeName="transform" type="rotate" values="-15 114 62; 15 114 62; -15 114 62" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="120" y="62" width="8" height="18" rx="4" fill="#1976d2">
        <animateTransform attributeName="transform" type="rotate" values="15 124 62; -15 124 62; 15 124 62" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Rizo de Superman -->
    <path d="M75 40 Q72 47 78 47" stroke="#222" stroke-width="2" fill="none"/>
</svg>
`;

// SVG de perro blanco cartoon volando horizontal con capa roja (más estilizado)
const dogSVG = `
<svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Capa roja -->
    <path d="M20 50 Q60 70 110 30 Q80 60 40 40 Z" fill="#e53935" opacity="0.8">
        <animate attributeName="d" values="M20 50 Q60 70 110 30 Q80 60 40 40 Z;M20 50 Q60 80 110 20 Q80 70 40 40 Z;M20 50 Q60 70 110 30 Q80 60 40 40 Z" dur="1.2s" repeatCount="indefinite"/>
    </path>
    <!-- Cuerpo -->
    <ellipse cx="70" cy="40" rx="25" ry="15" fill="#fff" stroke="#bbb" stroke-width="2"/>
    <!-- Cabeza -->
    <ellipse cx="45" cy="35" rx="11" ry="11" fill="#fff" stroke="#bbb" stroke-width="2"/>
    <!-- Orejas -->
    <ellipse cx="39" cy="25" rx="3" ry="6" fill="#fff" stroke="#bbb" stroke-width="2"/>
    <ellipse cx="51" cy="25" rx="3" ry="6" fill="#fff" stroke="#bbb" stroke-width="2"/>
    <!-- Ojos -->
    <ellipse cx="43" cy="35" rx="1.5" ry="2.5" fill="#222"/>
    <ellipse cx="47" cy="35" rx="1.5" ry="2.5" fill="#222"/>
    <!-- Nariz -->
    <ellipse cx="45" cy="41" rx="1.5" ry="1" fill="#222"/>
    <!-- Boca -->
    <path d="M43 45 Q45 48 47 45" stroke="#222" stroke-width="2" fill="none"/>
    <!-- Patas delanteras -->
    <rect x="85" y="50" width="7" height="13" rx="3.5" fill="#fff" stroke="#bbb" stroke-width="2">
        <animateTransform attributeName="transform" type="rotate" values="-15 88.5 50; 15 88.5 50; -15 88.5 50" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="100" y="50" width="7" height="13" rx="3.5" fill="#fff" stroke="#bbb" stroke-width="2">
        <animateTransform attributeName="transform" type="rotate" values="15 103.5 50; -15 103.5 50; 15 103.5 50" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Patas traseras -->
    <rect x="75" y="55" width="7" height="8" rx="3.5" fill="#fff" stroke="#bbb" stroke-width="2"/>
    <rect x="90" y="55" width="7" height="8" rx="3.5" fill="#fff" stroke="#bbb" stroke-width="2"/>
</svg>
`;

function animateFlyingCharacters() {
    // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
    // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
}

window.addEventListener('DOMContentLoaded', () => {
    // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
    // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
    animateFlyingCharacters();
    window.addEventListener('resize', () => {
        // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
        // Eliminar todas las líneas relacionadas con .flying-hero y .flying-dog y createFlyingCharacter
    });
}); 