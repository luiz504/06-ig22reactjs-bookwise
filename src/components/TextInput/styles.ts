import { styled } from '~/styles'

export const TextInputContainer = styled('div', {
  backgroundColor: '$gray800',
  borderRadius: '$xs',
  border: '1px solid $gray500',
  display: 'flex',
  padding: '0.875rem $5',
  gap: '$2',

  svg: {
    color: '$gray500',
    minWidth: '$5',
    minHeight: '$5',
  },

  '&:has(input:focus)': {
    borderColor: '$green200',
    transition: 'borderColor 150ms',
    svg: {
      color: '$green200',
      transition: 'color 150ms',
    },
  },
  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'default',
  },
})

export const Input = styled('input', {
  width: '100%',
  fontFamily: '$default',
  fontSize: '$sm',
  color: '$gray200',
  fontWeight: '$regular',
  background: 'transparent',
  border: 0,

  '&:focus': {
    outline: 0,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '$gray400',
  },
})
