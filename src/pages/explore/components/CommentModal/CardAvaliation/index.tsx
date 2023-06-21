import { FC } from 'react'
import dayjs from 'dayjs'

import { ProfileImage } from '~/components/ProfileImage'
import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'

import { Container, Header } from './styles'
import { AvaliationWithUser } from '~/types/AvaliationWithUser'

type CardAvaliationProps = {
  avaliation: AvaliationWithUser
}

export const CardAvaliation: FC<CardAvaliationProps> = ({ avaliation }) => {
  const distanceFromNow = dayjs().to(dayjs(avaliation.created_at))

  const createdTimeTitle = dayjs(avaliation.created_at).format(
    'YYYY-MM-DD HH:mm',
  )
  const createdDateTime = dayjs(avaliation.created_at).toDate().toString()

  return (
    <Container>
      <Header>
        <ProfileImage src={avaliation.user.avatar_url || ''} alt="" />
        <div className="info-col">
          <Heading size={'sm'}>{avaliation.user.name}</Heading>

          <Text
            as="time"
            size="sm"
            title={createdTimeTitle}
            dateTime={createdDateTime}
          >
            {distanceFromNow}
          </Text>
        </div>
        <Rating rating={avaliation.rate} />
      </Header>
      <Text size="sm">{avaliation.description}</Text>
    </Container>
  )
}

export { CardAvaliationSkeleton } from './skeleton'
