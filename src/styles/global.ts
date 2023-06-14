import { globalCss } from './index'
import { scrollbar, scrollbarThin } from './css/scrollbars'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
    ...scrollbar,
  },

  'body, button, textarea, input': {
    fontFamily: '$default',
    fontWeight: '$regular',
    fontSize: '$md',
  },

  'html, body': {
    scrollbarGutter: 'stable',
    ...scrollbarThin,
  },
})
