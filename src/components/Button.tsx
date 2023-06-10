import { styled } from '~/styles'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$xs',
  cursor: 'pointer',
  padding: '$1 $2',

  display: 'flex',
  alignItems: 'center',

  fontFamily: '$default',
  fontWeight: '$bold',

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray200',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: 'transparent',
        color: '$gray200',

        '&:hover': {
          backgroundColor: '$lightGrayTrans04',
          transition: 'background 150ms',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '$purple100',

        '&:hover': {
          backgroundColor: '$purpleTrans06',
          transition: 'background 150ms',
        },
      },
      terceary: {
        backgroundColor: '$gray600',
        color: '$purple100',

        '&:hover': {
          backgroundColor: '$gray500',
          transition: 'background 150ms',
        },
      },
    },
    size: {
      sm: {
        gap: '$2',
        fontSize: '$sm',
      },
      md: {
        gap: '$3',
        fontSize: '$md',
      },
      lg: {
        gap: '$6',
        padding: '$2',
      },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

Button.displayName = 'Button'
Button.defaultProps = {
  type: 'button',
}
