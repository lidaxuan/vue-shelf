export function setupEventTracking(classes) {
  const uniqueClasses = [...new Set(classes)];

  if (uniqueClasses.length > 0) {
    uniqueClasses.forEach(className => {
      const elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(element => {
        if (!element.__handleClick__) {
          const customData = element.getAttribute('data-customData');
          element.__handleClick__ = handleClick.bind(null, customData, className);
          element.addEventListener('click', element.__handleClick__);
        }
      });
    });
  } else {
    const elements = document.querySelectorAll('[data-burial-point="true"]');
    elements.forEach(element => {
      if (!element.__handleClick__) {
        const customData = element.getAttribute('data-customData');
        element.__handleClick__ = handleClick.bind(null, customData, '');
        element.addEventListener('click', element.__handleClick__);
      }
    });
  }
}

export function teardownEventTracking(classes) {
  const uniqueClasses = [...new Set(classes)];
  if (uniqueClasses.length > 0) {
    uniqueClasses.forEach(className => {
      const elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(element => {
        if (element.__handleClick__) {
          element.removeEventListener('click', element.__handleClick__);
          delete element.__handleClick__;
        }
      });
    });
  } else {
    const elements = document.querySelectorAll('[data-burial-point="true"]');
    elements.forEach(element => {
      if (element.__handleClick__) {
        element.removeEventListener('click', element.__handleClick__);
        delete element.__handleClick__;
      }
    });
  }
}

function handleClick(customData,className, event) {
  console.log(`Element with custom data ${JSON.parse(customData)}-${className} clicked`);
}
