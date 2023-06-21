import { Heading } from '~/components/texts'
import { TextArea } from '~/components/TextArea'
import { styled } from '~/styles'
import { RateAvaliator } from './RateAvaliator'

export const Container = styled('form', {
  padding: '$6',
  borderRadius: '$md',
  background: '$gray700',

  [`> ${TextArea}`]: {
    marginBottom: '$3',
  },
})

export const Header = styled('div', {
  display: 'flex',
  gap: '$4',
  marginBottom: '$6',

  [`> ${Heading}`]: {
    alignSelf: 'center',
    lineHeight: '$short',
  },

  [`> ${RateAvaliator}`]: {
    marginLeft: 'auto',
  },
})

export const ActionsRow = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  gap: '$2',

  button: {
    padding: '$2',

    '.icon-x': {
      color: '$purple100',
    },

    '.icon-check': {
      color: '$green100',
    },
  },
})
