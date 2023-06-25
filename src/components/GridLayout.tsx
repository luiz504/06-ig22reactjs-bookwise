import { styled } from '~/styles'

export const ContainerDuoCol = styled('div', {
  background: '$gray800',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '$4',
  paddingRight: '$5',

  '@bp-lg': {
    gap: '$10',
  },
  '@bp-xl': {
    padding: '$5',
    gridTemplateColumns: '232px 1fr',
  },
  '@bp-2xl': {
    padding: '$5 6rem $5 $5',
    gap: '6rem',
  },
})

export const AsideRight = styled('aside', {
  gridRow: '1fr',
})
