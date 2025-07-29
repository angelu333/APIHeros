// HeroPet Legends - Lógica de página inicial

document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const mainMenu = document.getElementById('mainMenu');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toRegister = document.getElementById('toRegister');
    const toLogin = document.getElementById('toLogin');
    const loginMsg = document.getElementById('loginMsg');
    const registerMsg = document.getElementById('registerMsg');
    const formOverlay = document.getElementById('formOverlay');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');

    // Mostrar login
    showLoginBtn.onclick = () => {
        mainMenu.style.display = 'none';
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        formOverlay.classList.remove('hidden');
    };
    // Mostrar registro
    showRegisterBtn.onclick = () => {
        mainMenu.style.display = 'none';
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        formOverlay.classList.remove('hidden');
    };
    // Ir a registro desde login
    toRegister.onclick = (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    };
    // Ir a login desde registro
    toLogin.onclick = (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    };
    // Cerrar login
    closeLogin.onclick = () => {
        loginForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        mainMenu.style.display = 'flex';
    };
    // Cerrar registro
    closeRegister.onclick = () => {
        registerForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        mainMenu.style.display = 'flex';
    };
    // Cerrar overlay al hacer click fuera del formulario
    formOverlay.onclick = () => {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        formOverlay.classList.add('hidden');
        mainMenu.style.display = 'flex';
    };

    // Login
    loginForm.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        loginMsg.textContent = '';
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) {
                const data = await res.json();
                loginMsg.textContent = data.error || 'Credenciales incorrectas';
                return;
            }
            // Login exitoso
            const loginData = await res.json();
            localStorage.setItem('gameToken', loginData.token);
            loginMsg.style.color = '#4ecdc4';
            loginMsg.textContent = '¡Bienvenido! Redirigiendo...';
            setTimeout(async () => {
                const token = localStorage.getItem('gameToken');
                console.log('Token tras login:', token);
                let heroeId = null;
                let mascotaId = null;
                try {
                    // Nuevo: obtener selección guardada en el backend
                    const userRes = await fetch('/api/user/me', {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                    if (userRes.ok) {
                        const user = await userRes.json();
                        if (user.selectedHero) {
                            heroeId = typeof user.selectedHero === 'object' ? user.selectedHero._id : user.selectedHero;
                            localStorage.setItem('heroeSeleccionado', heroeId);
                        }
                        if (user.selectedPet) {
                            mascotaId = typeof user.selectedPet === 'object' ? user.selectedPet._id : user.selectedPet;
                            localStorage.setItem('mascotaSeleccionada', mascotaId);
                        }
                    }
                    // Si no hay selección, seguir con el flujo anterior
                    if (!heroeId) {
                        // Fetch a /api/heroes para ver si hay héroes
                        const res = await fetch('/api/heroes', {
                            headers: { 'Authorization': 'Bearer ' + token }
                        });
                        if (res.ok) {
                            const heroes = await res.json();
                            console.log('Héroes recibidos tras login:', heroes);
                            if (heroes.length === 0) {
                                localStorage.removeItem('heroeSeleccionado');
                                localStorage.removeItem('mascotaSeleccionada');
                                window.location.href = 'elegir.html';
                                return;
                            }
                            // Si no hay heroeSeleccionado, forzar selección
                            const heroeSeleccionado = localStorage.getItem('heroeSeleccionado');
                            if (!heroeSeleccionado || heroeSeleccionado === 'null' || heroeSeleccionado === 'undefined' || heroeSeleccionado === '') {
                                localStorage.removeItem('mascotaSeleccionada');
                                window.location.href = 'elegir.html';
                                return;
                            }
                            heroeId = heroeSeleccionado;
                            // Buscar el héroe seleccionado en la lista
                            const heroObj = heroes.find(h => h._id === heroeId);
                            if (heroObj && heroObj.petId) {
                                mascotaId = heroObj.petId;
                                localStorage.setItem('mascotaSeleccionada', mascotaId);
                            }
                        } else {
                            console.error('Error al hacer fetch a /api/heroes:', res.status);
                            localStorage.removeItem('heroeSeleccionado');
                            localStorage.removeItem('mascotaSeleccionada');
                            window.location.href = 'elegir.html';
                            return;
                        }
                    }
                } catch (err) {
                    console.error('Error en fetch a /api/user/me o /api/heroes:', err);
                    localStorage.removeItem('heroeSeleccionado');
                    localStorage.removeItem('mascotaSeleccionada');
                    window.location.href = 'elegir.html';
                    return;
                }
                function isValid(val) {
                    return val && val !== 'null' && val !== 'undefined' && val !== '';
                }
                if (isValid(heroeId) && isValid(mascotaId)) {
                    window.location.href = 'home.html';
                } else if (isValid(heroeId) && !isValid(mascotaId)) {
                    window.location.href = 'elegirMascota.html';
                } else {
                    window.location.href = 'elegir.html';
                }
            }, 1200);
        } catch (err) {
            loginMsg.textContent = 'Error de conexión.';
        }
    };

    // Registro
    registerForm.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        registerMsg.textContent = '';
        // Limpiar localStorage de datos viejos
        localStorage.removeItem('heroeSeleccionado');
        localStorage.removeItem('mascotaSeleccionada');
        const nombre = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });
            if (!res.ok) {
                const data = await res.json();
                registerMsg.textContent = data.error || 'No se pudo registrar.';
                return;
            }
            registerMsg.style.color = '#4ecdc4';
            registerMsg.textContent = '¡Registro exitoso! Ahora inicia sesión.';
        } catch (err) {
            registerMsg.textContent = 'Error de conexión.';
        }
    };
}); 