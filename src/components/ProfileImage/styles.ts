import { styled } from '~/styles'

export const Container = styled('div', {
  background: '$gradientVertial',
  padding: 1,

  borderRadius: '$full',

  aspectRatio: 1 / 1,

  '.placeholder': {
    overflow: 'hidden',
    borderRadius: 'inherit',
    display: 'grid',

    img: {
      borderRadius: '$full',
      objectFit: 'cover',
    },
    svg: {
      color: '$gray800',

      alignSelf: 'center',
      justifySelf: 'center',
    },
  },

  variants: {
    size: {
      32: {
        width: 32,
        height: 32,

        '.placeholder': {
          width: 30,
          height: 30,

          svg: {
            width: 24,
            height: 24,
          },
        },
      },
      40: {
        width: 40,
        height: 40,
        '.placeholder': {
          width: 38,
          height: 38,

          svg: {
            width: 30,
            height: 30,
          },
        },
      },
      72: {
        width: 72,
        height: 72,
        '.placeholder': {
          width: 70,
          height: 70,

          svg: {
            width: 56,
            height: 56,
          },
        },
      },
    },
  },
})
