import { styled } from '~/styles'

export const ContainerGrid = styled('div', {
  background: '$gray800',

  display: 'grid',
  gridTemplateColumns: '232px 1fr 324px',
  padding: '$5 6rem $5 $5',
})

export const AsideRight = styled('aside', {
  gridRow: '1fr',
})

export const Main = styled('main', {
  gridRow: '1fr',
  marginLeft: 96,
  marginRight: 64,
})
