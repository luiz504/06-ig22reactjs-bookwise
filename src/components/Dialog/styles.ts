import * as DialogPrimitive from '@radix-ui/react-dialog'
import { keyframes, styled } from '~/styles'

export const Root = styled(DialogPrimitive.Root, {})

export const Portal = styled(DialogPrimitive.Portal, {})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Overlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const contentShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const Content = styled(DialogPrimitive.Content, {
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

  footer: {
    display: 'flex',
    justifyContent: 'end',
    gap: '$3',
  },
})

export const Title = styled(DialogPrimitive.Title, {
  color: '$gray200',
  fontSize: '$lg',
  lineHeight: '$short',
  fontWeight: '$bold',
  marginBottom: '$3',
})

export const Description = styled(DialogPrimitive.Description, {
  color: '$gray300',
  fontSize: '$md',
  lineHeight: '$base',
  marginBottom: '$10',
})

const BaseBtn = styled(DialogPrimitive.Close, {
  all: 'unset',
  borderRadius: '$xs',
  cursor: 'pointer',
  padding: '$2 $3',
  fontWeight: '$bold',
  textTransform: 'uppercase',

  backgroundColor: 'transparent',
  color: '$purple100',

  '&:hover': {
    backgroundColor: '$lightGrayTrans04',
    transition: 'background 150ms',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray200',
  },
})

export const Close = styled(BaseBtn, {})

export const Confirm = styled(BaseBtn, {
  color: '$green100',
})
