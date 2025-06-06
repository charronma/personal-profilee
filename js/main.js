// 主要脚本文件

import componentLoader from './load-components.js';

// 预加载导航栏
async function preloadNavbar() {
    try {
        // 使用预加载的导航栏内容
        const response = await fetch('components/navbar.html');
        if (!response.ok) throw new Error('Failed to load navbar');
        return await response.text();
    } catch (error) {
        console.error('Error loading navbar:', error);
        return null;
    }
}

// 初始化导航栏
async function initializeNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    try {
        // 使用组件加载器加载导航栏
        const success = await componentLoader.loadAndInsert('navbar', navbarPlaceholder);
        if (success) {
            // 使用 requestAnimationFrame 确保平滑过渡
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const navbar = document.querySelector('nav');
                    if (navbar) {
                        navbar.style.opacity = '0';
                        navbar.style.visibility = 'visible';
                        // 触发重排以确保过渡效果
                        navbar.offsetHeight;
                        navbar.style.opacity = '1';
                        navbar.style.transition = 'opacity 0.3s ease';
                    }
                    // 初始化导航栏功能
                    initNavbarFunctions();
                });
            });
        }
    } catch (error) {
        console.error('Failed to initialize navbar:', error);
    }
}

// 初始化页脚
async function initializeFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    try {
        await componentLoader.loadAndInsert('footer', footerPlaceholder);
    } catch (error) {
        console.error('Failed to initialize footer:', error);
    }
}

// 初始化导航栏功能
function initNavbarFunctions() {
    // 主题切换功能
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    }
    
    // 设置初始系统主题
    document.documentElement.style.colorScheme = savedTheme;
    
    // 主题切换按钮点击事件
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
    }
    
    // 导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    function updateNav() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // 向下滚动
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // 向上滚动
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    }
    
    // 初始化导航栏状态
    updateNav();
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateNav);
    });
    
    // 回到顶部按钮
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 设置当前页面高亮
    setActiveLink();
}

// 初始化移动菜单
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const menuContent = mobileMenu.querySelector('div:last-child');

    if (!mobileMenuButton || !mobileMenu || !closeMenuButton) return;

    // 打开菜单
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            menuContent.classList.remove('-translate-x-full');
            menuContent.classList.add('translate-x-0');
        });
    });

    // 关闭菜单
    closeMenuButton.addEventListener('click', () => {
        menuContent.classList.remove('translate-x-0');
        menuContent.classList.add('-translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    });

    // 点击菜单外部关闭
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu || e.target === mobileMenu.firstElementChild) {
            closeMenuButton.click();
        }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenuButton.click();
        }
    });
}

// 设置当前页面高亮
function setActiveLink() {
    const currentPath = window.location.pathname;
    const page = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // 更新桌面导航链接
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 更新移动导航链接
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    await initializeNavbar();
    await initializeFooter();
});

// 监听页面状态变化
window.addEventListener('popstate', () => {
    setActiveLink();
});

// 监听页面可见性变化
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        setActiveLink();
    }
});