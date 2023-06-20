import React, { ComponentProps, FC } from 'react'

import {
  Root,
  Portal,
  Overlay,
  Content,
  Close,
  Confirm,
  Title,
  Description,
} from './styles'

export interface DialogOptions {
  title: string
  description: string
  showCloseButton?: boolean
  closeButtonText?: string
  confirmButtonText?: string
}

interface DialogProps extends ComponentProps<typeof Root> {
  onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Dialog: FC<DialogProps & DialogOptions> = ({
  title,
  description,
  showCloseButton = true,
  closeButtonText = 'Close',
  confirmButtonText = 'Confirm',
  css,
  onConfirm,
  ...rest
}) => {
  return (
    <Root {...rest} modal={true}>
      <Portal>
        <Overlay />
        <Content css={css}>
          <Title>{title}</Title>
          <Description>{description}</Description>

          <footer>
            {showCloseButton && <Close autoFocus>{closeButtonText}</Close>}

            <Confirm onClick={onConfirm}>{confirmButtonText}</Confirm>
          </footer>
        </Content>
      </Portal>
    </Root>
  )
}
