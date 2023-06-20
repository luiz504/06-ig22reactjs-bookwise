import React, { ComponentProps, FC } from 'react'
import { signIn } from 'next-auth/react'
import { X } from 'phosphor-react'

import IconGoogle from '~/assets/google-icon.svg'
import IconGithub from '~/assets/github-fill-icon.svg'

import { Heading } from '~/components/texts'

import {
  Portal,
  Root,
  Overlay,
  Content,
  CloseBtn,
  SignInSection,
  SignInOption,
} from './styles'

type SignInModalProps = ComponentProps<typeof Root>

export const SignInModal: FC<SignInModalProps> = (props) => {
  return (
    <Root {...props}>
      <Portal>
        <Overlay />
        <Content>
          <CloseBtn>
            <X weight="bold" size={18} />
          </CloseBtn>
          <Heading size={'sm'}>Faça login para deixar sua avaliação</Heading>

          <SignInSection>
            <SignInOption
              as="button"
              onClick={() => signIn('google', { redirect: false })}
            >
              <IconGoogle />

              <Heading>Entrar com Google</Heading>
            </SignInOption>

            <SignInOption
              as="button"
              onClick={() => signIn('github', { redirect: false })}
            >
              <IconGithub />

              <Heading>Entrar com Github</Heading>
            </SignInOption>
          </SignInSection>
        </Content>
      </Portal>
    </Root>
  )
}
