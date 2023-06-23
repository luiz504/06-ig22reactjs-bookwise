import { Rating } from '~/components/Rating'
import { Heading, Text } from '~/components/texts'
import { styled } from '~/styles'

export const Container = styled('article', {
  [`> ${Text}`]: {
    marginBottom: '$2',
    lineHeight: '$base',
    color: '$gray300',
  },
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$6',
  background: '$gray700',
  borderRadius: '$md',

  [`> ${Text}`]: {
    lineHeight: '$base',
    color: '$gray300',
  },
})

export const MetaRow = styled('div', {
  display: 'flex',
  marginBottom: '$6',
  gap: '$6',

  img: {
    borderRadius: '$xs',
  },
})

export const MetaCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$1 0',
  flex: 1,

  [`> ${Heading}`]: {
    marginBottom: '0.125rem',
    lineHeight: '$short',
  },

  [`> ${Text}`]: {
    color: '$gray400',
    lineHeight: '$base',
  },

  [`> ${Rating}`]: {
    marginTop: 'auto',
  },
})
