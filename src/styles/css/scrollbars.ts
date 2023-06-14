import { CSS } from '@stitches/react'

export const scrollbar: CSS = {
  '--scrollbar-thumb-color': '$colors$gray600',
  '--scrollbar-track-color': '$colors$gray800',
  '--scrollbar-size': '0.75rem',
  scrollbarWidth: 'auto',
  scrollBehavior: 'smooth',

  scrollbarColor: 'var(--scrollbar-thumb-color) var(--scrollbar-track-color)',

  '&::-webkit-scrollbar': {
    width: 'var(--scrollbar-size)',
    height: 'var(--scrollbar-size)',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: 'var(--scrollbar-track-color)',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--scrollbar-thumb-color)',
    borderRadius: '999px',
  },
}
export const scrollbarThin: CSS = {
  ...scrollbar,
  '--scrollbar-size': '0.5rem',
  scrollBehavior: 'smooth',
}
