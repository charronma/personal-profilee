class Router {
    constructor() {
        this.routes = new Map();
        this.contentContainer = document.getElementById('content');
        this.init();
    }

    init() {
        // Handle initial page load
        window.addEventListener('DOMContentLoaded', () => {
            this.loadNavbar();
            this.handleNavigation(window.location.pathname);
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleNavigation(window.location.pathname, false);
        });

        // Handle link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                const path = new URL(link.href).pathname;
                this.navigate(path);
            }
        });
    }

    async loadNavbar() {
        try {
            const response = await fetch('/components/navbar.html');
            const html = await response.text();
            document.getElementById('navbar-placeholder').innerHTML = html;
            
            // Initialize mobile menu
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    async handleNavigation(path, addToHistory = true) {
        try {
            // Show loading state
            if (this.contentContainer) {
                this.contentContainer.style.opacity = '0';
            }

            // Fetch the new page content
            const response = await fetch(path);
            const html = await response.text();

            // Extract the main content from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main');

            if (mainContent && this.contentContainer) {
                // Update the page content
                this.contentContainer.innerHTML = mainContent.innerHTML;
                
                // Smooth transition
                setTimeout(() => {
                    this.contentContainer.style.opacity = '1';
                }, 50);

                // Update the browser history
                if (addToHistory) {
                    window.history.pushState({}, '', path);
                }

                // Update page title
                const newTitle = doc.title;
                if (newTitle) {
                    document.title = newTitle;
                }

                // Scroll to top
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    navigate(path) {
        this.handleNavigation(path);
    }
}

// Initialize the router
const router = new Router(); 