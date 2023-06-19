import Image from 'next/image'
import { ComponentProps } from 'react'

import { Container } from './styles'
import { User } from 'phosphor-react'

interface ProfileImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  size?: 32 | 40
  src?: ComponentProps<typeof Image>['src']
}

export const ProfileImage = ({
  alt,
  size = 40,
  src,
  ...rest
}: ProfileImageProps) => {
  return (
    <Container size={size}>
      <div className="placeholder">
        {!!src && (
          <Image src={src} alt={alt} height={size} width={size} {...rest} />
        )}
        {!src && <User weight="bold" />}
      </div>
    </Container>
  )
}
