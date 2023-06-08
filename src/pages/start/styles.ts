import { Text } from '~/components/Text'
import { styled } from '~/styles'

export const Header = styled('header', {
  marginTop: '3.25rem',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  marginBottom: '$10',

  svg: {
    color: '$green100',
  },
})

export const SectionRecentAvaliations = styled('section', {
  [`> ${Text}`]: {
    marginBottom: '$4',
  },
})
