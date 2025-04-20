class Router {
    constructor() {
        console.log('Router initialized');
        this.routes = {
            '/': 'index.html',
            '/about': 'about.html',
            '/blog': 'blog.html',
            '/portfolio': 'portfolio.html',
            '/gallery': 'gallery.html',
            '/contact': 'contact.html'
        };
        
        this.loadNavbar();
        this.handleNavigation();
    }

    async loadNavbar() {
        console.log('Loading navbar...');
        try {
            const response = await fetch('components/navbar.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            console.log('Navbar HTML loaded:', html.substring(0, 100) + '...');
            
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                console.log('Navbar placeholder found');
                navbarPlaceholder.innerHTML = html;
                console.log('Navbar inserted into DOM');
            } else {
                console.error('Navbar placeholder not found');
            }
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    handleNavigation() {
        console.log('Setting up navigation handlers...');
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                console.log('Navigation clicked:', route);
                this.navigate(route);
            }
        });
    }

    async navigate(route) {
        console.log('Navigating to:', route);
        const path = this.routes[route];
        if (path) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                console.log('Page content loaded:', html.substring(0, 100) + '...');
                
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.innerHTML = html;
                    console.log('Page content inserted into DOM');
                } else {
                    console.error('Main content container not found');
                }
            } catch (error) {
                console.error('Error loading page:', error);
            }
        }
    }
}

// 初始化路由
console.log('Creating router instance...');
const router = new Router();
console.log('Router instance created'); 