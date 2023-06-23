import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { CaretLeft, User } from 'phosphor-react'

import { queryParamToString } from '~/utils'
import {
  CardAvaliation,
  CardAvaliationSkeleton,
} from './components/CardAvaliation'
import { ProfileAside, ProfileAsideSkeleton } from './components/ProfileAside'

import { Sidebar } from '~/components/Sidebar'
import { Heading } from '~/components/texts'
import { AsideRight } from '~/components/GridLayout'
import { TextInput } from '~/components/TextInput'

import {
  Container,
  Header,
  Main,
  SubMain,
  AvaliationsSection,
  BtnGoBack,
  AvaliationsList,
} from './styles'
import { useProfilePageUserController } from './controllers/user.controller'

export default function Profile() {
  const router = useRouter()
  const userId = queryParamToString(router.query.userId)

  const session = useSession()

  const sessionUserId = session.data?.user.id

  const loggedUserProfile =
    !!userId && !!sessionUserId && userId === sessionUserId

  const { user, isLoadingUser } = useProfilePageUserController({ userId })

  return (
    <>
      <NextSeo title="Perfil | BookWise" />

      <Container>
        <Sidebar />
        <Main>
          <Header>
            {loggedUserProfile && (
              <>
                <User size={32} weight="bold" />
                <Heading as="h1" size={'lg'}>
                  Perfil
                </Heading>
              </>
            )}
            {!loggedUserProfile && (
              <BtnGoBack type="button" onClick={() => router.back()}>
                <CaretLeft size={20} weight="bold" />
                <Heading size={'sm'}>Voltar</Heading>
              </BtnGoBack>
            )}
          </Header>

          <SubMain>
            <AvaliationsSection>
              <label>
                <TextInput placeholder="Buscar livro avaliado" />
              </label>

              <AvaliationsList>
                <CardAvaliation />
                <CardAvaliationSkeleton />
              </AvaliationsList>
            </AvaliationsSection>

            <AsideRight>
              {user && <ProfileAside user={user} />}
              {(!user || isLoadingUser) && <ProfileAsideSkeleton />}
            </AsideRight>
          </SubMain>
        </Main>
      </Container>
    </>
  )
}
