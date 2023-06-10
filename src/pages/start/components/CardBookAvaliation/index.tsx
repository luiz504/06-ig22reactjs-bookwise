import { Text } from '~/components/Text'
import { Rating } from '~/components/Rating'
import { ProfileImage } from '~/components/ProfileImage'

import {
  BookInfoRow,
  BookInfoSection,
  Container,
  Header,
  UserInfo,
} from './styles'
import Image from 'next/image'
import { Heading } from '~/components/Heading'

export const CardBookAvaliation = () => {
  return (
    <Container variant={'secondary'}>
      <Header>
        <ProfileImage
          src={'https://github.com/luiz504.png'}
          size={40}
          alt="user profile"
        />
        <UserInfo>
          <Text size="md">Luiz Bueno</Text>
          <time>Hoje</time>
        </UserInfo>

        <Rating rating={4} />
      </Header>
      <BookInfoRow>
        <Image
          src={'https://github.com/luiz504.png'}
          height={152}
          width={108}
          alt="book name cover"
        />
        <BookInfoSection>
          <Heading size={'sm'}>O Hobbit</Heading>
          <Text as="span" size={'sm'}>
            J.R.R. Tolkien
          </Text>

          <Text size={'sm'}>
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et
            aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo
            a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh... ver mais
          </Text>
        </BookInfoSection>
      </BookInfoRow>
    </Container>
  )
}
