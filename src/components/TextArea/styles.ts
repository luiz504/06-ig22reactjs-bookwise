import { styled } from '~/styles'

export const Container = styled('div', {
  position: 'relative',

  lineHeight: 0,
})

export const BaseTextArea = styled('textarea', {
  backgroundColor: '$gray800',
  padding: '0.875rem $5',
  borderRadius: '$xs',
  border: '1px solid $gray500',
  width: '100%',

  fontFamily: '$default',
  fontSize: '$sm',
  color: '$white',
  fontWeight: '$regular',
  resize: 'none',
  minHeight: 160,

  '&:not(:disabled):focus': {
    outline: 0,
    borderColor: '$green200',
    transition: 'borderColor 150ms',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'default',
  },

  '&:placeholder': {
    color: '$gray400',
  },
})

export const CaracterCounter = styled('span', {
  position: 'absolute',
  right: '.75rem',
  bottom: '0.5rem',
  pointerEvents: 'none',
  fontSize: '$xs',
  lineHeight: '$base',
  color: '$gray450',
  textAlign: 'right',
})
