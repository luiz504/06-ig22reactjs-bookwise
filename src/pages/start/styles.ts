import { Text } from '~/components/texts'
import { styled } from '~/styles'

export const Container = styled('div', {
  background: '$gray800',
  display: 'grid',
  gridTemplateColumns: '232px 1fr',
  gap: '$4',
  padding: '$5',

  '@bp-lg': {
    gap: '$10',
  },
  '@bp-2xl': {
    padding: '$5 6rem $5 $5',
    gap: '6rem',
  },
})

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

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
})

export const AvaliationsSectAndSuggestionsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr  324px',
  gap: '$4',

  '@bp-lg': {
    gap: '$10',
  },
  '@bp-2xl': {
    padding: '$5 6rem $5 $5',
    gap: '$16',
  },
})

export const SectionRecentAvaliations = styled('section', {
  [`> ${Text}`]: {
    marginBottom: '$4',
  },
})
