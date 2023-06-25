import { Text } from '~/components/texts'
import { styled } from '~/styles'

export const Header = styled('header', {
  marginTop: '3.25rem',
  marginBottom: '$10',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

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
  gap: '$4',
  '> section': {
    order: 2,
  },
  '>aside': {
    order: 1,
  },
  '@bp-850': {
    gridTemplateColumns: '1fr  324px',
    '> section, aside': {
      order: 'initial',
    },
  },

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
