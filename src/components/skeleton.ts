import { keyframes, styled } from '~/styles'

const pulseAnimation = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
})

export const Skeleton = styled('div', {
  animation: `${pulseAnimation} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  borderRadius: '$sm',
  background: '$gray800',
  height: '$4',
  variants: {
    roundedFull: {
      true: {
        borderRadius: '$full',
      },
    },
    widthFull: {
      true: {
        width: '100%',
      },
    },

    bg: {
      gray700: {
        background: '$gray700',
      },
    },
  },
})
