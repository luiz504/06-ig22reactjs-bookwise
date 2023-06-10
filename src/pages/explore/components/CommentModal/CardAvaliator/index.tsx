import { ProfileImage } from '~/components/ProfileImage'
import { ActionsRow, Container, Header } from './styles'
import { Heading } from '~/components/Heading'
import { Rating } from '~/components/Rating'
import { TextArea } from '~/components/TextArea'
import { Check, X } from 'phosphor-react'
import { Button } from '~/components/Button'

export const CardAvaliator = () => {
  const user = {
    avatar_url: 'https://github.com/luiz504.png',
    name: 'Luiz Bueno',
  }

  return (
    <Container>
      <Header>
        <ProfileImage src={user.avatar_url} alt="User Avatar Profile Image" />
        <Heading size="sm">{user.name}</Heading>
        <Rating rating={0} />
      </Header>

      <TextArea
        placeholder="Escreva a sua avaliação"
        caracterCounter={0}
        maxLength={450}
      />

      <ActionsRow>
        <Button variant={'terceary'}>
          <X size="24" className="icon-x" />
        </Button>

        <Button variant={'terceary'}>
          <Check size="24" className="icon-check" />
        </Button>
      </ActionsRow>
    </Container>
  )
}
