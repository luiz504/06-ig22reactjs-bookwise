import Link from 'next/link'
import { styled } from '~/styles'
import { Text } from '../texts'

export const Container = styled('aside', {
  minHeight: 'fit-content',
  height: 'calc(100svh - 40px)',
  borderRadius: '$2xl',

  width: 232,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',

  backgroundImage: `url(/bg-sidebar.svg)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  overflow: 'auto',
})

export const Header = styled('div', {
  padding: '$10 3.25rem',
  marginBottom: '$6',
  zIndex: 1,
})

export const Navbar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '4.25rem',
  gap: '$4',
  zIndex: 1,
  marginBottom: '$6',
})

export const NavItem = styled(Link, {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  gap: '$3',
  padding: '$2 0',
  cursor: 'default',

  [`${Text}`]: {
    color: '$gray400',
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

export const SignOutButton = styled('button', {
  background: 'transparent',
  border: 0,

  display: 'flex',
  alignItems: 'center',

  gap: '$3',
  padding: '$1',
  borderRadius: '$xs',

  img: {
    borderRadius: '$full',
  },

  svg: {
    color: '#F75A68',
    width: '$5',
    height: '$5',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
