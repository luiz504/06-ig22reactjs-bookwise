import { styled } from '~/styles'

import { Box } from '~/components/Box'
import { Heading, Text } from '~/components/texts'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '638px 1fr',

  '@media (max-width:1200px)': {
    gridTemplateColumns: '1fr 500px',
  },
  '@media (max-width:900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const Preview = styled('div', {
  position: 'relative',
  padding: '$5',
  maxHeight: '100svh',

  '.logo': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  '.preview': {
    borderRadius: 10,
    objectFit: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  '@media (max-width:900px)': {
    padding: '$2',
    height: 300,
    '.preview': {
      objectPosition: 'bottom',
      maxHeight: '100%',
      width: '100%',
    },
  },
})

export const Hero = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const BoxHero = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: 388,
  padding: '0 $2',

  marginTop: '15rem',
  marginBottom: '$10',

  [`> ${Heading}`]: {
    lineHeight: '$short',
    marginBottom: '0.125rem',
  },
  [`> ${Text}`]: {
    marginBottom: '$10',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },

  '@media (max-width:900px)': {
    marginTop: '$20',
  },

  '@media (max-height: 500px)': {
    marginTop: '$10',
  },
})

export const SignInOption = styled(Box, {
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none !important',

  gap: '$5',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$purple100',
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
