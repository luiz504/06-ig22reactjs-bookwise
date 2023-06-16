import { Box } from '~/components/Box'
import { Text } from '~/components/texts'

import { styled } from '~/styles'

export const Container = styled(Box, {
  flexDirection: 'column',
  [`& + &`]: {
    marginTop: '$3',
  },
})

export const Header = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '$4',
  marginBottom: '$8',

  img: {
    borderRadius: '$full',
  },
})

export const UserInfo = styled('div', {
  marginRight: 'auto',
  [`> ${Text}`]: {
    lineHeight: '$base',
  },
  time: {
    fontSize: '$sm',
    color: '$gray400',
  },
})

export const BookInfoRow = styled('article', {
  display: 'flex',
  gap: '$5',

  img: {
    objectFit: 'contain',
  },
})

export const BookInfoSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  h2: {
    lineHeight: '$short',
  },

  span: {
    marginBottom: '$5',
    color: '$gray400',
    lineHeight: '$base',
  },

  p: {
    color: '$gray300',
    lineHeight: '$base',
  },
})
