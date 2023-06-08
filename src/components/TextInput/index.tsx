import React, { ComponentProps, forwardRef, ElementRef } from 'react'

import { TextInputContainer, Input } from './styles'
import { MagnifyingGlass } from 'phosphor-react'

type IconType = typeof MagnifyingGlass

export interface TextInputProps
  extends Omit<ComponentProps<typeof Input>, 'size'> {
  icon?: IconType
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  ({ icon: Icon, css, ...rest }, ref) => {
    return (
      <TextInputContainer className="text-input" css={css}>
        <Input ref={ref} {...rest} />
        <MagnifyingGlass weight="bold" />
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
TextInput.toString = () => '.text-input'
