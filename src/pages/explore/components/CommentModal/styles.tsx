import * as Dialog from '@radix-ui/react-dialog'

import { keyframes, styled } from '~/styles'

export const Root = Dialog.Root

export const Portal = Dialog.Portal

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(70%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translateX(0 scale(1)' },
})

export const Content = styled(Dialog.Content, {
  background: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: 660,
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  display: 'flex',
  flexDirection: 'column',
  padding: '$6 $12',
})

export const CloseBtn = styled(Dialog.Close, {
  width: 'fit-content',
  padding: '$1',
  marginLeft: 'auto',
  marginBottom: '$4',
  lineHeight: 0,
  backgroundColor: 'transparent',
  border: 0,
  color: '$gray400',
  cursor: 'pointer',
  borderRadius: '$px',
  textAlign: 'center',
})

export const AvaliationsSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$10',
})

export const AvaliationLabelAndActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$4',
})

export const AvaliationsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})
