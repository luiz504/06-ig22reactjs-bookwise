import Link from 'next/link'
import { styled } from '~/styles'
import { Heading, Text } from '../texts'
import { ProfileImage } from '../ProfileImage'

export const Container = styled('aside', {
  minHeight: 'fit-content',
  height: '100svh',
  minWidth: '64px',

  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',

  backgroundImage: `url(/bg-sidebar.svg)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  overflow: 'auto',

  position: 'sticky',
  top: 0,
  left: 0,
  bottom: 0,

  '@bp-xl': {
    position: 'initial',
    height: 'calc(100svh - 40px)',
    borderRadius: '$2xl',
    width: 232,
  },
})

export const Header = styled('div', {
  padding: '$10 3.25rem',
  marginBottom: '$6',
  zIndex: 1,

  '@bp-max-xl': {
    display: 'none',
  },
})

export const Navbar = styled('nav', {
  zIndex: 1,
  margin: '$6 0',
  padding: '$4',
  gap: '$6',

  display: 'flex',
  flexDirection: 'column',

  '@bp-xl': {
    gap: '$4',
    marginTop: '0',
    paddingLeft: '4.25rem',
  },
})

export const NavItem = styled(Link, {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  gap: '$3',

  padding: '$1',

  [`${Text}`]: {
    display: 'none',
    color: '$gray400',

    '@bp-xl': {
      padding: '$2 0',
      display: 'initial',
    },
  },

  svg: {
    width: '$6',
    height: '$6',
    color: '$gray400',
  },

  '&:focus-visible': {
    [`${Text}`]: {
      textDecoration: 'underline',
    },

    '@bp-max-xl': {
      boxShadow:
        '5px 0 0px -3.5px $colors$gray100, -5px 0 0px -3.5px $colors$gray100',

      borderRadius: '$xs',
    },
  },

  variants: {
    active: {
      true: {
        [`${Text}`]: {
          color: '$gray100',
          fontWeight: 'bold',
        },
        svg: {
          color: '$gray100',
        },

        '&::before': {
          position: 'absolute',
          content: ' ',
          height: '$6',
          width: '$1',
          left: -20,
          background: '$gradientVertial',
          borderRadius: '$full',

          '@bp-max-xl': {
            left: '50%',
            bottom: '-4px',
            width: '$6',
            height: '$1',
            transform: 'translateX(-50%)',
          },
        },
      },
    },
  },
})

export const Footer = styled('div', {
  marginTop: 'auto',
  padding: '$6 $2',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1,
})

export const ButtonSign = styled('button', {
  background: 'transparent',
  border: 0,
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',

  gap: '$3',
  padding: '$1',
  borderRadius: '$xs',
  textDecoration: 'none',

  [`> ${Text}, ${Heading}`]: {
    lineHeight: '$base',
    color: '$gray200',
  },

  '> svg.sign-in': {
    color: '$green100',
  },
  '> svg.sign-out': {
    color: '$gray300',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '@bp-max-xl': {
    [`> ${Text}, ${Heading}, ${ProfileImage}`]: {
      display: 'none',
    },
    svg: {
      width: '$6',
      height: '$6',
    },
  },
})
