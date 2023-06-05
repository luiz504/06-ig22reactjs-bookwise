import React, { ComponentProps, forwardRef, ElementRef } from 'react'

import { TextInputContainer, Input } from './styles'
import { MagnifyingGlass } from 'phosphor-react'

type IconType = typeof MagnifyingGlass

export interface TextInputProps
  extends Omit<ComponentProps<typeof Input>, 'size'> {
  icon?: IconType
}

export const TextInput = forwardRef<ElementRef<typeof Input>, TextInputProps>(
  ({ icon: Icon, ...rest }, ref) => {
    return (
      <TextInputContainer>
        <Input ref={ref} {...rest} />
        <MagnifyingGlass weight="bold" />
      </TextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
