import { Heading, Text } from '~/components/texts'
import { styled } from '~/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  borderBottom: '1px solid $gray700',

  hr: {
    background: '$gradientHorizontal',
    border: 0,
    height: '$1',
    width: '$8',
    margin: '$8 auto',
    borderRadius: '$full',
  },

  '@bp-850': {
    borderLeft: '1px solid $gray700',
    borderBottom: 0,
  },
})

export const Header = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  flex: 1,

  [`> ${Heading}`]: {
    marginTop: '$5',
    textAlign: 'center',
    fontSize: '$xl',
    lineHeight: '$short',
  },
  [`> ${Text}`]: {
    lineHeight: '$base',
    color: '$gray400',
    marginBottom: '$2',
  },
})

export const UserMetaList = styled('div', {
  padding: '$5  3.5rem',
  display: 'grid',
  gap: '$10',

  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',

  '@bp-850': {
    gridTemplateColumns: '1fr',
  },
})

export const MetaItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',

  svg: {
    color: '$green100',
  },

  div: {
    [`> ${Heading}`]: {
      lineHeight: '$short',
      color: '$gray200',
    },

    [`> ${Text}`]: {
      color: '$gray300',
      lineHeight: '$base',
    },
  },
})
