import { styled } from '~/styles'

export const Container = styled('div', {
  background: '$gradientVertial',
  padding: 1,

  borderRadius: '$full',

  aspectRatio: 1 / 1,

  '.placeholder': {
    overflow: 'hidden',
    borderRadius: 'inherit',
  },

  img: {
    borderRadius: '$full',
    objectFit: 'contain',
  },

  variants: {
    size: {
      32: {
        width: 32,
        height: 32,

        '.placeholder': {
          width: 30,
          height: 30,
        },
      },
      40: {
        width: 40,
        height: 40,
        '.placeholder': {
          width: 38,
          height: 38,
        },
      },
    },
  },
})
