import { styled } from '~/styles'

export const Box = styled('div', {
  display: 'flex',
  borderRadius: '$md',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$gray600',
        border: '2px solid $gray600',
      },
      secondary: {
        backgroundColor: '$gray700',
        border: '2px solid $gray700',
      },
    },
    size: {
      sm: {
        padding: '$4 $5',
      },
      md: {
        padding: '$5 $6',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})
