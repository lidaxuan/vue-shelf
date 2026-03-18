/**
 * 表格表头吸顶方法（基于你的原始指令改造）
 * @param {HTMLElement} tableEl - el-table的DOM元素（$el）
 * @param {Object} options - 配置项
 * @param {string} options.top - 吸顶top值，如'0px'
 * @param {number} options.zIndex - z-index层级，如999
 * @returns {Object} 包含销毁方法的对象
 */
function initTableSticky(tableEl, options) {
  // 配置默认值
  const opts = {
    top: '0px',
    zIndex: 100,
    ...options
  };

  // ---------------- 复制你原始的工具函数 ----------------
  // 将新节点插入某个节点前
  var insertBefore = function (newElement, targetElement) {
    var parent = targetElement.parentNode;
    // 如果最后的节点是目标元素，则直接添加
    if (typeof newElement === 'string') {
      var temp = document.createElement('div');
      temp.innerHTML = newElement;
      // 防止元素太多 进行提速
      var frag = document.createDocumentFragment();
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      parent.insertBefore(frag, targetElement);
    } else {
      parent.insertBefore(newElement, targetElement);
    }
  };

  // 根据子节点的className获取dom的子节点
  function children(curEle, className) {
    var ary = [];
    if (!curEle) return ary; // 增加空值判断，避免报错
    ary = Array.prototype.slice.call(curEle.children)
    if (typeof className === "string") {
      for (var k = 0; k < ary.length; k++) {
        var curEleNode = ary[k];
        if ((' ' + curEleNode.className + ' ').indexOf(' ' + className + ' ') === -1) {
          ary.splice(k, 1);
          k--;
        }
      }
    }
    return ary;
  }

  // ---------------- 核心逻辑 ----------------
  var resizeObserver, resizeObserverBodyWrapper;
  // 创建新table用于放表头（每个表格独立创建，避免全局冲突）
  let panel = document.createElement("div");
  // 挂载到tableEl上，方便销毁时获取
  tableEl.__stickyPanel__ = panel;
  tableEl.__stickyObservers__ = {resizeObserver: null, resizeObserverBodyWrapper: null};

  // 1. 初始化panel（对应你指令的inserted钩子）
  panel.style = `position: sticky;top: ${opts.top}; z-index: ${opts.zIndex};`;
  tableEl.style.borderTop = 'none';
  // 给创建的table复制来原本的class
  panel.classList.add(...tableEl.classList);
  panel.classList.add("newwwwww");
  // 在el-table前加入创建的表格(同等级的兄弟关系)
  insertBefore(panel, tableEl);

  // 2. 核心处理逻辑（对应你指令的componentUpdated钩子）
  function handleSticky() {
    console.log('触发表头吸顶处理');
    // 获取table的bodyDiv
    let bodyWrapper = children(tableEl, 'el-table__body-wrapper')[0];
    if (!bodyWrapper) {
      console.warn('未找到el-table__body-wrapper节点，请检查表格是否渲染完成');
      return;
    }

    let func = function (fixedClassName) {
      let elFixed = children(tableEl, fixedClassName)[0];
      console.log("elFixed", elFixed)
      if (!elFixed) return; // 固定列不存在则直接返回

      // 移动主表头到panel
      let headerWrapperMain = children(tableEl, 'el-table__header-wrapper')[0];
      if (headerWrapperMain !== undefined && !panel.contains(headerWrapperMain)) {
        panel.append(headerWrapperMain);
      }

      // 处理固定列表头
      let headerWrapper = children(elFixed, 'el-table__fixed-header-wrapper')[0];
      if (headerWrapper) {
        // 修复JSON.stringify导致的样式问题（你的原始bug）
        headerWrapper.style.width = elFixed.offsetWidth + 'px';
        headerWrapper.style.overflow = 'hidden';

        if (fixedClassName === 'el-table__fixed-right') {
          headerWrapper.style.right = '0px';
          headerWrapper.style.left = 'auto';
          headerWrapper.style.display = 'flex';
          headerWrapper.style.flexDirection = 'row-reverse';

          // 初始化右固定列阴影
          if ((' ' + bodyWrapper.className + ' ').indexOf('is-scrolling-none') === -1) {
            headerWrapper.style.boxShadow = '0 0 10px rgba(0,0,0,.12)';
          }

          // 获取 右侧固定同时存在滚动条时的占位块
          let rightPatch = children(tableEl, 'el-table__fixed-right-patch')[0];
          if (rightPatch) { // 增加空值判断
            rightPatch.style.position = 'absolute';
            rightPatch.style.right = '999999px';
            resizeObserver = new ResizeObserver(function (entries) {
              entries.forEach((item, index) => {
                headerWrapper.style.paddingRight = item.contentRect.width + 'px';
              });
            });
            // 缓存监听实例
            tableEl.__stickyObservers__.resizeObserver = resizeObserver;
            resizeObserver.observe(rightPatch);
          }
        }

        // 监听固定列的阴影出现与否
        resizeObserverBodyWrapper = new MutationObserver(function (entries) {
          if (fixedClassName === 'el-table__fixed-right') {
            if ((' ' + entries[0].target.className + ' ').indexOf('is-scrolling-right') === -1) {
              headerWrapper.style.boxShadow = '0 0 10px rgba(0,0,0,.12)';
            } else {
              headerWrapper.style.boxShadow = 'none';
            }
          } else {
            if ((' ' + entries[0].target.className + ' ').indexOf('is-scrolling-left') === -1) {
              headerWrapper.style.boxShadow = '0 0 10px rgba(0,0,0,.12)';
            } else {
              headerWrapper.style.boxShadow = 'none';
            }
          }
        });
        // 缓存监听实例
        tableEl.__stickyObservers__.resizeObserverBodyWrapper = resizeObserverBodyWrapper;
        resizeObserverBodyWrapper.observe(bodyWrapper, {
          attributes: true,
          attributeFilter: ['class'],
        });
      }

      // 处理固定列body
      console.log("children(elFixed, 'el-table__fixed-body-wrapper')", children(elFixed, 'el-table__fixed-body-wrapper'))
      let fixedBodyWrapper = children(elFixed, 'el-table__fixed-body-wrapper')[1];
      console.log("fixedBodyWrapper", fixedBodyWrapper)
      if (fixedBodyWrapper) {
        setTimeout(() => {
          console.log(333)
          fixedBodyWrapper.style.top = "0px";
          fixedBodyWrapper.style.setProperty('top', '0px', 'important');
        }, 0);
      }

      // 移动固定列表头到panel
      let fixedHeaderWrapper = children(elFixed, 'el-table__fixed-header-wrapper')[0];
      if (fixedHeaderWrapper !== undefined && !panel.contains(fixedHeaderWrapper)) {
        panel.append(fixedHeaderWrapper);
      }

    };

    func('el-table__fixed');
  }

  // 3. 销毁方法（对应你指令的unbind钩子）
  function destroySticky() {
    // 清理监听
    if (tableEl.__stickyObservers__.resizeObserver) {
      tableEl.__stickyObservers__.resizeObserver.disconnect();
    }
    if (tableEl.__stickyObservers__.resizeObserverBodyWrapper) {
      tableEl.__stickyObservers__.resizeObserverBodyWrapper.disconnect();
    }
    // 清理panel节点
    if (tableEl.__stickyPanel__) {
      tableEl.__stickyPanel__.remove();
      delete tableEl.__stickyPanel__;
    }
    // 清理滚动条
    let scrollDiv = children(tableEl.parentNode, 'newScrollDiv')[0];
    if (scrollDiv) {
      scrollDiv.remove();
    }
    // 清理缓存
    delete tableEl.__stickyObservers__;
  }

  // 立即执行核心逻辑
  handleSticky();

  // 返回销毁方法，方便页面卸载时调用
  return {
    destroy: destroySticky
  };
}

// 暴露到全局，方便组件中调用
window.initTableSticky = initTableSticky;
