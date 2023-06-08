import Image from 'next/image'
import { ComponentProps } from 'react'

import { Container } from './styles'

interface ProfileImageProps extends ComponentProps<typeof Image> {
  size?: 32 | 40
}

export const ProfileImage = ({
  alt,
  size = 40,
  ...rest
}: ProfileImageProps) => {
  return (
    <Container size={size}>
      <div className="placeholder">
        <Image alt={alt} height={size} width={size} {...rest} />
      </div>
    </Container>
  )
}
