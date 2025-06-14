import '../../styles/global/main.css';
import '../../styles/pages/login.css';
import { setupNavigationButtons, addButtonHoverEffects } from '../../utils/navigation';
import { authStore, AuthActions } from '../../flux';
import { LoginData } from '../../types/User';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Login page loaded successfully');
    
    const logo = document.querySelector('.Logo') as HTMLImageElement;
    if (logo) {
        logo.src = '/assets/imgs/logo/LogoHiFiaca Ajustado No Fondo.png';
    }

    const circles = document.querySelectorAll('.CircleBig, .CircleMedium') as NodeListOf<HTMLImageElement>;
    circles.forEach(circle => {
        circle.src = '/assets/imgs/logo/Circulos sin fondo.png';
    });

    setupLoginForm();
    
    setupNavigationButtons();
    
    addButtonHoverEffects('.ButtonContainer');

    authStore.addChangeListener(handleAuthChange);
    

});

function setupLoginForm(): void {
    const usernameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    const loginButton = document.querySelector('button') as HTMLButtonElement;
    const loginLink = document.querySelector('.ButtonContainer') as HTMLAnchorElement;

    if (!usernameInput || !passwordInput || !loginButton || !loginLink) {
        console.error('No se encontraron los elementos del formulario');
        return;
    }

    usernameInput.placeholder = 'Email';
    usernameInput.type = 'email';
    passwordInput.placeholder = 'Contraseña';

    loginLink.href = '#';
    loginLink.onclick = (e) => e.preventDefault();

    const handleLogin = async (e: Event) => {
        e.preventDefault();
        
        const email = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showError('Por favor, completa todos los campos');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, ingresa un email válido');
            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = 'Ingresando...';

        const loginData: LoginData = { email, password };
        
        try {
            await AuthActions.login(loginData);
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    loginButton.addEventListener('click', handleLogin);
    
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLogin(e);
            }
        });
    });
}

function handleAuthChange(): void {
    const loginButton = document.querySelector('button') as HTMLButtonElement;
    
    if (authStore.isLoading()) {
        loginButton.disabled = true;
        loginButton.textContent = 'Ingresando...';
        clearErrorUI();
    } else {
        loginButton.disabled = false;
        loginButton.textContent = 'Log In';
        
        if (authStore.isAuthenticated()) {
+            console.log('Login exitoso, redirigiendo...');
            window.location.href = 'home.html';
        } else if (authStore.getError()) {
            showError(authStore.getError() || 'Error desconocido');
        }
    }
}

function showError(message: string): void {
    clearErrorUI();
    
    const container = document.querySelector('.InputContainer') as HTMLElement;
    if (!container) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #E22134;
        font-size: 0.9rem;
        margin: 10px 0;
        text-align: center;
        background: rgba(226, 33, 52, 0.1);
        padding: 10px;
        border-radius: 6px;
        border: 1px solid rgba(226, 33, 52, 0.3);
    `;

    container.appendChild(errorDiv);

    
    setTimeout(clearErrorUI, 5000);
}

function clearError(): void {
    clearErrorUI();
    AuthActions.clearError();
}

function clearErrorUI(): void {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


window.addEventListener('beforeunload', () => {
    authStore.removeChangeListener(handleAuthChange);
});
