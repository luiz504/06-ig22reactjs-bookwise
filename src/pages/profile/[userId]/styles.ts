import { Heading } from '~/components/texts'
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

  '> svg': {
    color: '$green100',
  },
})

export const BtnGoBack = styled('button', {
  all: 'unset',
  borderRadius: '$xs',
  padding: '$1 $2',
  gap: '$3',
  color: '$gray200',

  display: 'flex',
  alignItems: 'center',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    color: '$gray200',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray200',
  },
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
})

export const SubMain = styled('div', {
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

export const AvaliationsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

export const AvaliationsSection = styled('section', {
  [`> label`]: {
    display: 'block',
    marginBottom: '$10',
  },
})
