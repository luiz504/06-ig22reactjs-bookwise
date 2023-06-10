import React from 'react'

import { Container, Header } from './styles'
import { ProfileImage } from '~/components/ProfileImage'
import { Heading } from '~/components/Heading'
import { Text } from '~/components/Text'
import { Rating } from '~/components/Rating'
import dayjs from 'dayjs'

export const CardPost = () => {
  const user = {
    avatar_url: 'https://github.com/luiz504.png',
    name: 'Luiz Bueno',
    created_at: new Date('2023-06-4'),
  }

  const distanceFromNow = dayjs().to(dayjs(user.created_at))

  const createdTimeTitle = dayjs(user.created_at).format('YYYY-MM-DD HH:mm')
  const createdDateTime = dayjs(user.created_at).toDate().toString()

  return (
    <Container>
      <Header>
        <ProfileImage src={'https://github.com/luiz504.png'} alt="" />
        <div className="info-col">
          <Heading size={'sm'}>{user.name}</Heading>

          <Text
            as="time"
            size="sm"
            title={createdTimeTitle}
            dateTime={createdDateTime}
          >
            {distanceFromNow}
          </Text>
        </div>
        <Rating rating={4} />
      </Header>
      <Text size="sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
        cupiditate fugiat, dolores eos at eum porro rerum enim consequatur
        similique quaerat ipsam, explicabo voluptatum sequi error minima quae
        sapiente! Dignissimos!
      </Text>
    </Container>
  )
}
