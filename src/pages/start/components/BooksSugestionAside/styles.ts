import { Text } from '~/components/Text'
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

export const SuggestionsList = styled('div', {})
