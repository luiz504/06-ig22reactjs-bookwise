import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from 'phosphor-react'

import logoFull from '~/assets/logo-full.png'

import { Text, Heading } from '../texts'
import { ProfileImage } from '../ProfileImage'

import {
  ButtonSign,
  Container,
  Footer,
  Header,
  NavItem,
  Navbar,
} from './styles'

export const Sidebar = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const logged = !!session?.user
  const user = session?.user

  return (
    <Container>
      <Header>
        <Image src={logoFull} height={32} priority alt="BookWise logo" />
      </Header>

      <Navbar>
        <NavItem href={'/start'} active={router.pathname === '/start'}>
          <ChartLineUp weight="bold" /> <Text>Início</Text>
        </NavItem>

        <NavItem href={'/explore'} active={router.pathname === '/explore'}>
          <Binoculars weight="bold" /> <Text>Explorar</Text>
        </NavItem>

        {logged && (
          <NavItem
            href={`/profile/${user?.id}`}
            active={router.pathname === '/profile'}
          >
            <User weight="bold" /> <Text>Profile</Text>
          </NavItem>
        )}
      </Navbar>

      <Footer>
        {logged && (
          <ButtonSign
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            <ProfileImage
              src={session.user.avatar_url || ''}
              alt={'Logged User profile picture'}
              size={32}
            />

            <Text size={'sm'}>{session.user.name}</Text>

            <SignOut className="sign-out" weight="bold" size={20} />
          </ButtonSign>
        )}

        {!logged && (
          <ButtonSign onClick={() => router.push('/')}>
            <Heading size={'sm'}>Fazer login</Heading>

            <SignIn className="sign-in" weight="bold" size={20} />
          </ButtonSign>
        )}
      </Footer>
    </Container>
  )
}
