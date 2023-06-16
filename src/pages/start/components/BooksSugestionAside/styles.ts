import { Box } from '~/components/Box'
import { Text } from '~/components/texts'

import { styled } from '~/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$4',

  [`> ${Text}`]: {
    lineHeight: '$base',
  },
  button: {
    lineHeight: '$base',
    svg: {
      height: '$4',
      width: '$4',
    },
  },
})

export const SuggestionsList = styled('div', {
  display: 'grid',
  gap: '$3',
})

export const ItemInfoCol = styled('div', {
  [`> ${Text}`]: {
    color: '$gray400',
    marginBottom: 'auto',
  },

  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})

export const SugestionItem = styled(Box, {
  gap: '$5',
  textDecoration: 'none',
  color: '$gray100',

  img: {
    borderRadius: '$xs',
  },

  variants: {
    skeleton: {
      false: {
        '&:hover': {
          borderColor: '$gray600',
          transition: 'border-color 150ms',
        },
      },
    },
  },
  defaultVariants: {
    skeleton: false,
  },
})
