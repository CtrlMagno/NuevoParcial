import '../../styles/global/main.css';
import '../../styles/pages/home.css';
import '../../styles/components/appContainer.css';
import { authStore, AuthActions } from '../../flux';

class AppContainer extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    disconnectedCallback(): void {
        const modal = document.querySelector('comment-modal');
        if (modal) {
            modal.remove();
        }
    }

    connectedCallback(): void {
        this.initializeAuth();
        this.render();
        this.setupLogoutButton();
        this.setupCommentModal();
    }

    private setupCommentModal(): void {
        if (!document.querySelector('comment-modal')) {
            const modal = document.createElement('comment-modal');
            document.body.appendChild(modal);
            console.log('Modal de comentarios agregado al document.body');
        }
        
        setTimeout(() => {
            const modal = document.querySelector('comment-modal');
            console.log('Modal en DOM después del render:', modal);
        }, 100);
    }

    private async initializeAuth(): Promise<void> {

        AuthActions.initializeAuthListener();
        

        authStore.addChangeListener(() => {
            this.checkAuthentication();
        });
        

        setTimeout(() => {
            this.checkAuthentication();
        }, 1000);
    }

    private checkAuthentication(): void {
        const currentUser = authStore.getCurrentUser();
        const isAuthenticated = authStore.isAuthenticated();
        
        console.log('Estado de autenticación:', { currentUser, isAuthenticated });
        
        if (!isAuthenticated || !currentUser) {
            console.log('Usuario no autenticado, esperando sincronización con Firebase...');

            setTimeout(() => {
                if (!authStore.isAuthenticated()) {
                    console.log('Sin autenticación confirmada, redirigiendo al login...');
                    window.location.href = 'login.html';
                }
            }, 2000);
        } else {
            console.log('Usuario autenticado:', currentUser.username || currentUser.email);
        }
    }

    private setupLogoutButton(): void {
        const logoutBtn = document.getElementById('logout-btn');
        if (!logoutBtn) {
            console.warn('Botón de logout no encontrado');
            return;
        }

        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
            if (!confirmLogout) {
                return;
            }

            try {
                console.log('Iniciando logout...');
                

                const icon = logoutBtn.querySelector('img');
                const originalSrc = icon?.getAttribute('src');
                if (icon) {
                    icon.style.opacity = '0.5';
                    logoutBtn.style.pointerEvents = 'none';
                }


                await AuthActions.logout();


                console.log('Logout exitoso, redirigiendo...');
                

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);

            } catch (error) {
                console.error('Error durante logout:', error);
                

                const icon = logoutBtn.querySelector('img') as HTMLImageElement;
                if (icon) {
                    icon.style.opacity = '1';
                    logoutBtn.style.pointerEvents = 'auto';
                }
                
                alert('Error al cerrar sesión. Inténtalo de nuevo.');
            }
        });


        logoutBtn.addEventListener('mouseenter', () => {
            const icon = logoutBtn.querySelector('img') as HTMLImageElement;
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });

        logoutBtn.addEventListener('mouseleave', () => {
            const icon = logoutBtn.querySelector('img') as HTMLImageElement;
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    }

    render(): void {
        if (!this.shadow) return;

        this.shadow.innerHTML = `
        <style>
        /* Los estilos ya están cargados globalmente a través de las importaciones */
        </style>
        <div class="Container">
            <!-- Formulario para crear posts -->
            <post-creator></post-creator>

            <!-- Feed de posts reales desde Firebase -->
            <post-feed></post-feed>
        </div>
        `;
    }
}

if (!customElements.get('app-container')) {
    customElements.define('app-container', AppContainer);
}
