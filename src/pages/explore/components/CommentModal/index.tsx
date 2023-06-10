import { ComponentProps, useState } from 'react'
import {
  Root,
  Portal,
  Overlay,
  Content,
  CloseBtn,
  AvaliationsSection,
  AvaliationLabelAndActions,
  AvaliationsList,
} from './styles'
import { X } from 'phosphor-react'

import { CardBook } from './CardBook'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { CardPost } from './CardPost'
import { CardAvaliator } from './CardAvaliator'

type CommentModalProps = ComponentProps<typeof Root>

export const CommentModal = (props: CommentModalProps) => {
  const [isOpenAvaliator, setIsOpenAvaliator] = useState(false)

  const handleOpenAvaliator = () => {
    const loggedIn = true
    if (loggedIn) {
      setIsOpenAvaliator(true)
    }
  }

  return (
    <Root {...props}>
      <Portal>
        <Overlay />
        <Content>
          <CloseBtn>
            <X weight="bold" size={15} />
          </CloseBtn>

          <CardBook />

          <AvaliationsSection>
            <AvaliationLabelAndActions>
              <Text size={'sm'}>Avaliações</Text>

              {!isOpenAvaliator && (
                <Button variant={'secondary'} onClick={handleOpenAvaliator}>
                  Avaliar
                </Button>
              )}
            </AvaliationLabelAndActions>

            <AvaliationsList>
              {isOpenAvaliator && <CardAvaliator />}
              <CardPost />
            </AvaliationsList>
          </AvaliationsSection>
        </Content>
      </Portal>
    </Root>
  )
}
