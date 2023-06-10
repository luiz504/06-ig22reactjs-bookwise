import { styled } from '~/styles'

export const CardBookContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray700',
  borderRadius: '$lg',
  padding: '$6 $8 $4',
})

export const MainInfoRow = styled('div', {
  display: 'flex',
  gap: '$8',
  marginBottom: '$10',

  img: {
    borderRadius: '$lg',
  },
})

export const MainInfoCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '.rating-row': {
    marginTop: 'auto',
    p: {
      marginTop: '$1',
      color: '$gray400',
      lineHeight: '$base',
    },
  },
})

export const ExtraInfoRow = styled('div', {
  borderTop: '1px solid $gray600',
  display: 'flex',
  padding: '$6 0',
  gap: 56,
})

export const ExtraInforCol = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  svg: {
    color: '$green100',
  },
  p: {
    color: '$gray300',
    lineHeight: '$base',
  },
  h2: {
    lineHeight: '$short',
  },
})
