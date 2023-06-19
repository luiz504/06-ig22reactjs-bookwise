import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '~/components/Box'
import { Heading } from '~/components/texts'

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
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 660,
  maxWidth: '90svh',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  background: '$gray700',
  borderRadius: '$xl',

  display: 'flex',
  flexDirection: 'column',
  padding: '$6',

  [`> ${Heading}`]: {
    color: '$gray200',
    textAlign: 'center',
    marginBottom: '$10',
  },
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

export const SignInSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  margin: '0 3.5rem 3.5rem',
})

export const SignInOption = styled(Box, {
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none !important',

  gap: '$5',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$purple100',
  },

  [`> ${Heading}`]: {
    color: '$gray200',
    lineHeight: '$base',
  },
})
