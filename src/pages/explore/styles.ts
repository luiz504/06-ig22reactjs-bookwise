import Link from 'next/link'
import { styled } from '~/styles'

import { Box } from '~/components/Box'
import { Heading, Text } from '~/components/texts'
import { TextInput } from '~/components/TextInput'

export const Main = styled('main', {})

export const Header = styled('header', {
  marginTop: '3.25rem',
  marginBottom: '$10',

  display: 'flex',
  flexDirection: 'column',

  justifyContent: 'space-between',
  gap: '$6',

  [`> ${Heading}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    lineHeight: '$short',

    svg: {
      width: '$8',
      height: '$8',
      color: '$green100',
    },
  },

  [`& ${TextInput}`]: {
    width: '100%',
  },

  '@bp-sm': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$4',

    [`& ${TextInput}`]: {
      maxWidth: 433,
    },
  },
})

export const TopicsList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  marginBottom: '$12',
})

export const TopicItem = styled(Link, {
  padding: '$1 $4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',

  border: '1px solid $purple100',
  borderRadius: 999,
  color: '$purple100',
  lineHeight: '$base',

  '&:hover': {
    borderColor: '$purple100',
    background: '$purple200',
    transition: 'background 150ms, border-color 150ms, color 150ms',
    color: '$gray100',
  },

  variants: {
    active: {
      true: {
        borderColor: '$purple200',
        background: '$purple200',
        color: '$gray100',
      },
    },
  },
})

export const BooksGridList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '$5',
})

export const SugestionItem = styled(Box, {
  gap: '$5',
  textDecoration: 'none',
  color: '$gray100',

  img: {
    borderRadius: '$xs',
  },

  '&:hover': {
    borderColor: '$gray600',
    transition: 'border-color 150ms',
  },
})

export const ItemInfoCol = styled('div', {
  [`> ${Text}`]: {
    color: '$gray400',
    marginBottom: 'auto',
  },

  display: 'flex',
  flexDirection: 'column',
})
