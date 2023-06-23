import Image from 'next/image'

import { useDateFormatter } from '~/hooks/useDateFormater'

import { Heading, Text } from '~/components/texts'
import { Rating } from '~/components/Rating'

import { Container, Content, MetaRow, MetaCol } from './styles'

export const CardAvaliation = () => {
  const { distanceFromNow } = useDateFormatter(new Date('2022-06-22'))

  return (
    <Container>
      <Text size={'sm'}>{distanceFromNow}</Text>
      <Content>
        <MetaRow>
          <Image
            src={
              'https://images.unsplash.com/photo-1687090277460-664d439eb3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
            }
            alt=""
            height={134}
            width={98}
          />
          <MetaCol>
            <Heading>Entendendo Algoritmos </Heading>
            <Text>Aditya Bhargava</Text>

            <Rating rating={4} />
          </MetaCol>
        </MetaRow>
        <Text size={'sm'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet fuga
          hic dolore nobis ullam ad impedit atque magnam. Et laudantium tempore
          aut reiciendis cumque labore nihil ad quo explicabo placeat!
        </Text>
      </Content>
    </Container>
  )
}

export { CardAvaliationSkeleton } from './skeleton'
