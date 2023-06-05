import { ComponentProps } from 'react'
import { styled } from '~/styles'

export const Textarea = styled('textarea', {
  backgroundColor: '$gray900',
  padding: '0.875rem $5',
  borderRadius: '$xs',
  border: '1px solid $gray500',

  fontFamily: '$default',
  fontSize: '$sm',
  color: '$white',
  fontWeight: '$regular',
  resize: 'vertical',
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

export interface TextareaProps extends ComponentProps<typeof Textarea> {}

Textarea.displayName = 'Textarea'
