class Router {
    constructor() {
        this.routes = new Map();
        this.contentContainer = document.getElementById('content');
        this.loadingOverlay = this.createLoadingOverlay();
        this.init();
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-300';
        overlay.innerHTML = `
            <div class="flex flex-col items-center space-y-4">
                <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p class="text-gray-700 dark:text-gray-300">加载中...</p>
            </div>
        `;
        overlay.style.display = 'none';
        document.body.appendChild(overlay);
        return overlay;
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
            // Show loading overlay
            this.loadingOverlay.style.display = 'flex';
            this.loadingOverlay.style.opacity = '1';

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
                    // Hide loading overlay
                    this.loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        this.loadingOverlay.style.display = 'none';
                    }, 300);
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
            // Hide loading overlay on error
            this.loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                this.loadingOverlay.style.display = 'none';
            }, 300);
        }
    }

    navigate(path) {
        this.handleNavigation(path);
    }
}

// Initialize the router
const router = new Router(); 