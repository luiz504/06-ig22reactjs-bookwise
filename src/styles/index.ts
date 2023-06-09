import { createStitches, defaultThemeMap } from '@stitches/react'
import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  radii,
  space,
} from './tokens'
import { media } from './tokens/media'

export * from './css/scrollbars'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    minWidth: 'space',
    maxWidth: 'space',
    height: 'space',
    minHeight: 'space',
    maxHeight: 'space',
  },
  media,
  theme: {
    colors,
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    radii,
    space,
  },
  prefix: 'bw',
})
