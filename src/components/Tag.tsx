import { styled } from '~/styles'

export const Tag = styled('div', {
  padding: '$1 $4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: '1px solid $purple100',
  borderRadius: 999,
  color: '$purple100',
  lineHeight: '$base',

  '&:hover': {
    borderColor: '$purple100',
    background: '$purple200',
    transition: 'background 150ms, border-color 150ms, color 150ms',
    color: '$gray100',
  },

  variants: {
    selected: {
      true: {
        borderColor: '$purple200',
        background: '$purple200',
        color: '$gray100',
      },
    },
  },
})
