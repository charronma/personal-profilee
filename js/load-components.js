// 组件加载管理器
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadingPromises = new Map();
    }

    // 注册组件
    register(name, url) {
        this.components.set(name, url);
    }

    // 加载组件
    async load(name) {
        // 如果组件已经在加载中，返回现有的 Promise
        if (this.loadingPromises.has(name)) {
            return this.loadingPromises.get(name);
        }

        // 创建新的加载 Promise
        const loadPromise = (async () => {
            try {
                const url = this.components.get(name);
                if (!url) {
                    throw new Error(`Component ${name} not registered`);
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to load component ${name}`);
                }

                const html = await response.text();
                return html;
            } catch (error) {
                console.error(`Error loading component ${name}:`, error);
                throw error;
            } finally {
                // 加载完成后移除 Promise
                this.loadingPromises.delete(name);
            }
        })();

        // 存储加载 Promise
        this.loadingPromises.set(name, loadPromise);
        return loadPromise;
    }

    // 加载并插入组件
    async loadAndInsert(name, targetElement) {
        try {
            const html = await this.load(name);
            if (targetElement) {
                // 创建临时容器
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // 获取组件内容和样式
                const component = tempDiv.firstElementChild;
                const style = tempDiv.querySelector('style');
                
                if (component) {
                    // 插入组件
                    targetElement.parentNode.insertBefore(component, targetElement);
                    
                    // 插入样式
                    if (style) {
                        document.head.appendChild(style);
                    }
                    
                    // 移除占位符
                    targetElement.remove();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error(`Error inserting component ${name}:`, error);
            return false;
        }
    }

    // 预加载所有组件
    async preloadAll() {
        const loadPromises = Array.from(this.components.keys()).map(name => this.load(name));
        return Promise.all(loadPromises);
    }
}

// 创建全局组件加载器实例
const componentLoader = new ComponentLoader();

// 注册常用组件
componentLoader.register('navbar', 'components/navbar.html');
componentLoader.register('footer', 'components/footer.html');

// 导出组件加载器
export default componentLoader; 