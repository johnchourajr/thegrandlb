import Typography from 'typography'

// http://kyleamathews.github.io/typography.js/
const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  headerFontFamily: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "sans-serif"],
  bodyFontFamily: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "sans-serif"],
  scaleRatio: 6,
  headerGray: 0,
  headerWeight: 800,
  bodyGray: 0,
})

typography.toString()

export const typographyInject = typography.injectStyles()
