module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,tsx}', './src/*.{html,tsx}'],
  variants: {
    extend: {
      backgroundColor: ['hover', 'active', 'group-hover']
    }
  }
}
