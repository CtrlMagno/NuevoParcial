/**
 * Utilidades para manejar navegación entre páginas
 */

export const navigateToPage = (pageName: string, delay: number = 0): void => {
  const pageRoutes: { [key: string]: string } = {
    'login': 'login.html',
    'signup': 'signup.html',
    'home': 'home.html'
  };

  const targetPage = pageRoutes[pageName.toLowerCase()];
  
  if (!targetPage) {
    console.error(`Page "${pageName}" not found in routes`);
    return;
  }

  if (delay > 0) {
    setTimeout(() => {
      window.location.href = targetPage;
    }, delay);
  } else {
    window.location.href = targetPage;
  }
};

export const setupNavigationButtons = (): void => {
  const navButtons = document.querySelectorAll('[data-navigate]');
  
  navButtons.forEach(button => {
    const targetPage = button.getAttribute('data-navigate');
    if (targetPage) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Navigating to: ${targetPage}`);
        navigateToPage(targetPage);
      });
    }
  });


  const navLinks = document.querySelectorAll('a[href$=".html"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = (link as HTMLAnchorElement).href;
      console.log(`Navigating via link to: ${href}`);
    });
  });
};

export const addButtonHoverEffects = (selector: string = '.CardBotton'): void => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach(button => {
    const htmlButton = button as HTMLElement;
    
    button.addEventListener('mouseenter', () => {
      htmlButton.style.transform = 'scale(1.05)';
      htmlButton.style.transition = 'transform 0.2s ease';
      htmlButton.style.cursor = 'pointer';
    });
    
    button.addEventListener('mouseleave', () => {
      htmlButton.style.transform = 'scale(1)';
    });
  });
}; 