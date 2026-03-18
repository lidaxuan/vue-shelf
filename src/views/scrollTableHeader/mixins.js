/**
 * 设置元素的粘性定位样式
 * @param {HTMLElement} element - 目标元素
 * @param {Object} options - 定位选项
 * @param {string|number} options.top - 顶部位置
 * @param {string|number} [options.left] - 左侧位置
 * @param {string|number} [options.right] - 右侧位置
 * @param {number} [options.zIndex=10] - 层级
 */
const setStickyStyle = (element, { top, left, right, zIndex = 10 }) => {
  element.style.position = 'sticky';
  element.style.zIndex = zIndex;

  if (top !== undefined) element.style.top = typeof top === 'number' ? `${top}px` : top;
  if (left !== undefined) element.style.left = typeof left === 'number' ? `${left}px` : left;
  if (right !== undefined) element.style.right = typeof right === 'number' ? `${right}px` : right;
};

/**
 * 计算顶部距离
 * @param {*} value - 指令的值
 * @returns {string} - 顶部距离字符串
 */
const calculateTop = (value) => {
  if (!isNaN(Number(value))) {
    return `${value}px`;
  }

  if (typeof value === 'string') {
    const element = document.querySelector(value);
    if (element) {
      const rect = element.getBoundingClientRect();
      return `${rect.top + rect.height}px`;
    }
  }

  return '0px';
};

/**
 * 处理固定列
 * @param {Array} fixedColumns - 固定列配置数组
 * @param {HTMLElement} headerWrapper - 表头包装元素
 * @param {string} top - 顶部距离
 * @param {string} direction - 方向: 'left' 或 'right'
 */
const handleFixedColumns = (fixedColumns, headerWrapper, top, direction = 'left') => {
  if (!fixedColumns || !fixedColumns.length) return;

  let accumulatedWidth = 0;
  const columns = direction === 'left' ? fixedColumns : [...fixedColumns].reverse();

  columns.forEach((column) => {
    const columnWidth = column.width || column.realWidth || column.minWidth;
    const cell = headerWrapper.querySelector(`th.${column.id}`);

    if (cell) {
      const styleOptions = { top, zIndex: 10 };

      if (direction === 'left') {
        styleOptions.left = accumulatedWidth;
        accumulatedWidth += columnWidth;
      } else {
        styleOptions.right = accumulatedWidth;
        accumulatedWidth += columnWidth;
      }

      setStickyStyle(cell, styleOptions);
    }
  });
};

/**
 * 查找表格组件实例
 * @param {Array} children - Vue组件子实例数组
 * @param {HTMLElement} targetEl - 目标DOM元素
 * @returns {Object|null} - 找到的表格实例
 */
const findTableComponent = (children, targetEl) => {
  if (!Array.isArray(children) || children.length === 0) {
    return null;
  }

  for (const child of children) {
    if (child.$el === targetEl) {
      return child;
    }

    if (child.$children?.length) {
      const found = findTableComponent(child.$children, targetEl);
      if (found) return found;
    }
  }

  return null;
};

/**
 * 修复固定列的隐藏类
 * @param {HTMLElement} headerWrapper - 表头包装元素
 */
const fixFixedColumnClasses = (headerWrapper) => {
  const hiddenThs = headerWrapper.querySelectorAll('th.is-hidden');
  hiddenThs.forEach(th => th.classList.remove('is-hidden'));
};

/**
 * 观察器管理类（内部使用）
 */
class ObserverManager {
  constructor() {
    this.observers = new Map();
  }

  observe(element, callback) {
    if (!element || this.observers.has(element)) return;

    const observer = new ResizeObserver(callback);
    observer.observe(element);
    this.observers.set(element, observer);
  }

  unobserve(element) {
    if (!element || !this.observers.has(element)) return;

    const observer = this.observers.get(element);
    observer.unobserve(element);
    observer.disconnect();
    this.observers.delete(element);
  }

  clear() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

/**
 * 创建粘性表头管理器
 * @param {HTMLElement} el - 表格容器元素（通常带有 .el-table 类）
 * @param {*} bindingValue - 同指令的 binding.value，可以是数字或选择器字符串
 * @param {Object} vnodeContext - Vue 组件实例（用于查找表格组件，通常为 this 或 setup 上下文）
 * @returns {Object} - 包含 update 和 destroy 方法的对象
 */
export function createStickyThead(el, bindingValue, vnodeContext) {
  const observerManager = new ObserverManager();

  // 核心更新函数
  const update = () => {
    const top = calculateTop(bindingValue);

    el.style.overflow = 'visible';

    const headerWrapper = el.querySelector('.el-table__header-wrapper');
    if (!headerWrapper) return;

    setStickyStyle(headerWrapper, { top });
    fixFixedColumnClasses(headerWrapper);

    const table = findTableComponent(vnodeContext.$children, el);
    if (!table) return;

    handleFixedColumns(table.fixedColumns, headerWrapper, top, 'left');
    handleFixedColumns(table.rightFixedColumns, headerWrapper, top, 'right');
  };

  // 初始执行
  update();

  // 观察表格本身的变化
  observerManager.observe(el, update);

  // 如果绑定值是选择器，观察目标元素的变化
  if (typeof bindingValue === 'string') {
    const targetElement = document.querySelector(bindingValue);
    if (targetElement) {
      observerManager.observe(targetElement, update);
    }
  }

  // 销毁函数：停止所有观察
  const destroy = () => {
    observerManager.unobserve(el);
    if (typeof bindingValue === 'string') {
      const targetElement = document.querySelector(bindingValue);
      if (targetElement) {
        observerManager.unobserve(targetElement);
      }
    }
    observerManager.clear();
  };

  return { update, destroy };
}
