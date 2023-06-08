import { Heading } from '~/components/Heading'
import { TextInput } from '~/components/TextInput'
import { styled } from '~/styles'

export const Container = styled('div', {
  background: '$gray800',

  display: 'grid',
  gridTemplateColumns: '232px 1fr',
  gap: '6rem',
  padding: '$5 6rem $5 $5',
})

export const Main = styled('main', {})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$10',

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
    width: '433px',
  },
})

export const TopicsList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  marginBottom: '$12',
})

export const BooksGridList = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '$5',
})
