import Image from 'next/image'
import { useRouter } from 'next/router'
import { Binoculars, ChartLineUp, SignOut, User } from 'phosphor-react'

import logoFull from '~/assets/logo-full.png'

import { Text } from '../Text'

import {
  Background,
  Container,
  Footer,
  Header,
  NavItem,
  Navbar,
  SignOutButton,
} from './styles'

import bg from '~/assets/bg-sidebar.svg'

export const Sidebar = () => {
  const logged = true
  const router = useRouter()

  return (
    <Container>
      <Background>
        <Image src={bg} alt="" priority quality={100} />
      </Background>

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
          <NavItem href={'/profile'} active={router.pathname === '/profile'}>
            <User weight="bold" /> <Text>Profile</Text>
          </NavItem>
        )}
      </Navbar>

      <Footer>
        <SignOutButton>
          <Image
            src={'https://github.com/luiz504.png'}
            alt={'Logged User profile picture'}
            height={32}
            width={32}
          />

          <Text> Luiz Bueno </Text>

          <SignOut weight="bold" />
        </SignOutButton>
      </Footer>
    </Container>
  )
}
