class Router {
    constructor() {
        console.log('[Router] 初始化');
        this.routes = {
            '/': 'index.html',
            '/about': 'about.html',
            '/blog': 'blog.html',
            '/portfolio': 'portfolio.html',
            '/gallery': 'gallery.html',
            '/contact': 'contact.html'
        };
        
        this.loadNavbar();
        this.loadFooter();
        this.handleNavigation();
    }

    async loadNavbar() {
        console.log('[Router] 加载导航栏...');
        try {
            const response = await fetch('components/navbar.html');
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            const html = await response.text();
            console.log('[Router] 导航栏HTML加载成功');
            
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                console.log('[Router] 找到导航栏占位符');
                navbarPlaceholder.innerHTML = html;
                console.log('[Router] 导航栏插入到DOM');

                // 确保移动菜单按钮在所有页面都能正常工作
                const mobileMenuButton = document.getElementById('mobile-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');
                
                if (mobileMenuButton && mobileMenu) {
                    console.log('[Router] 设置移动菜单按钮点击事件');
                    
                    mobileMenuButton.addEventListener('click', function(e) {
                        console.log('[Router] 移动菜单按钮被点击');
                        e.preventDefault();
                        
                        if (mobileMenu.classList.contains('show')) {
                            console.log('[Router] 隐藏移动菜单');
                            mobileMenu.classList.remove('show');
                            mobileMenu.classList.add('hide');
                        } else {
                            console.log('[Router] 显示移动菜单');
                            mobileMenu.classList.remove('hide');
                            mobileMenu.classList.add('show');
                        }
                    });
                }
            } else {
                console.error('[Router] 导航栏占位符未找到');
            }
        } catch (error) {
            console.error('[Router] 加载导航栏出错:', error);
        }
    }

    async loadFooter() {
        console.log('[Router] 加载页脚...');
        try {
            const response = await fetch('components/footer.html');
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            const html = await response.text();
            console.log('[Router] 页脚HTML加载成功');
            
            let footerPlaceholder = document.getElementById('footer-placeholder');
            if (!footerPlaceholder) {
                console.log('[Router] 未找到页脚占位符，创建新的占位符');
                footerPlaceholder = document.createElement('div');
                footerPlaceholder.id = 'footer-placeholder';
                document.body.appendChild(footerPlaceholder);
            }
            
            footerPlaceholder.innerHTML = html;
            console.log('[Router] 页脚插入到DOM');
        } catch (error) {
            console.error('[Router] 加载页脚出错:', error);
        }
    }

    handleNavigation() {
        console.log('[Router] 设置导航处理程序...');
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const route = e.target.getAttribute('data-route');
                console.log('[Router] 点击导航:', route);
                this.navigate(route);
            }
        });
    }

    async navigate(route) {
        console.log('[Router] 导航到:', route);
        const path = this.routes[route];
        if (path) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`HTTP错误! 状态: ${response.status}`);
                }
                const html = await response.text();
                console.log('[Router] 页面内容加载成功');
                
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.innerHTML = html;
                    console.log('[Router] 页面内容插入到DOM');
                    
                    // 加载页脚
                    this.loadFooter();
                } else {
                    console.error('[Router] 主内容容器未找到');
                }
            } catch (error) {
                console.error('[Router] 加载页面出错:', error);
            }
        }
    }
}

// 初始化路由
console.log('[Router] 创建路由实例...');
const router = new Router();
console.log('[Router] 路由实例创建完成'); 