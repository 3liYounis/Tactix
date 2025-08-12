const tailwindConfig = require('./tailwind.config.cjs');

console.log('------ Tailwind Config Debug ------');
console.log('Dark Mode Setting:', tailwindConfig.darkMode);
console.log('Content Paths:', tailwindConfig.content);

const colors = tailwindConfig.theme?.colors || {};
const extendedColors = tailwindConfig.theme?.extend?.colors || {};

console.log('Theme Colors Keys:', Object.keys(colors));
console.log('Extended Colors Keys:', Object.keys(extendedColors));

console.log('-----------------------------------');
