import React, { ComponentProps, forwardRef } from 'react'

import { CaracterCounter, Container, BaseTextArea } from './styles'

interface TextAreaProps extends ComponentProps<typeof BaseTextArea> {
  caracterCounter?: number
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ caracterCounter, maxLength, ...props }, ref) => {
    const showCaracterCounter =
      typeof caracterCounter === 'number' &&
      caracterCounter >= 0 &&
      typeof maxLength === 'number' &&
      maxLength > 0

    return (
      <Container className="textarea-container">
        <BaseTextArea maxLength={maxLength} {...props} ref={ref} />

        {showCaracterCounter && (
          <CaracterCounter>
            {caracterCounter}/{maxLength || 0}
          </CaracterCounter>
        )}
      </Container>
    )
  },
)

TextArea.displayName = 'TextArea'

TextArea.toString = () => '.textarea-container'
