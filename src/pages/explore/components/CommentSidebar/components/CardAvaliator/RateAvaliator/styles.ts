import { styled } from '~/styles'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',

  div: {
    display: 'flex',
  },
})

export const BtnRate = styled('button', {
  all: 'unset',
  lineHeight: 0,
  cursor: 'pointer',
  display: 'flex',
  position: 'relative',

  borderRadius: '$px',

  '&:disabled': {
    cursor: 'default',
  },
  svg: {
    height: '28px',
    width: '14px',
  },

  '&:before': {
    content: '',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    zIndex: 1,

    outline: '1px solid transparent',
  },

  '&:focus-visible': {
    '&:before': {
      outlineColor: '$gray200',
    },
  },

  variants: {
    left: {
      true: { padding: '$1 0 $1 $1', borderRadius: '$px 0 0 $px' },
    },
    right: {
      true: { padding: '$1 $1 $1 0', borderRadius: '0 $px $px 0' },
    },
  },
})
