// src/presets/index.js
import fadeIn from '../generator/fadeIn.json';
import slideUp from '../generator/slideUp.json';

// Each preset is an object that may contain:
// { keyframes: [...], duration: number, delay: number, easing: 'easeInOutQuad', loop: false }
export default {
  fadeIn,
  slideUp
};
