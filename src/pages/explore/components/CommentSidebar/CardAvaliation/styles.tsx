import { Rating } from '~/components/Rating'
import { Text } from '~/components/texts'
import { styled } from '~/styles'

export const Container = styled('div', {
  padding: '$6',
  background: '$gray700',
  borderRadius: '$md',

  [`> ${Text}`]: {
    color: '$gray300',
    lineHeight: '$base',
  },
})

export const Header = styled('div', {
  display: 'flex',
  gap: '$4',
  marginBottom: '$5',

  '.info-col': {
    [`> ${Text}`]: {
      color: '$gray400',
      lineHeight: '$base',
    },
  },

  [`> ${Rating}`]: {
    marginLeft: 'auto',
  },
})
