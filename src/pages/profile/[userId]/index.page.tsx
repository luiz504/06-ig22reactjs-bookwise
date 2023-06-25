import { Fragment } from 'react'
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
import { FeedbackText, Heading } from '~/components/texts'
import { AsideRight, ContainerDuoCol } from '~/components/GridLayout'
import { TextInput } from '~/components/TextInput'

import {
  Header,
  Main,
  SubMain,
  AvaliationsSection,
  BtnGoBack,
  AvaliationsList,
} from './styles'
import { useProfilePageUserController } from './controllers/user.controller'
import { useProfilePageAvaliationsController } from './controllers/avaliations.controller'

export default function Profile() {
  const router = useRouter()
  const userId = queryParamToString(router.query.userId)

  const session = useSession()

  const sessionUserId = session.data?.user.id

  const loggedUserProfile =
    !!userId && !!sessionUserId && userId === sessionUserId

  const {
    searchInputRef,
    handleSetSearchValue,
    skeletonList,
    hasNextPage,
    loadMoreSkeletonRef,
    avaliationsPages,
    isLoadingAvaliations,
    noResultsFound,
    getFeedbackText,
  } = useProfilePageAvaliationsController({
    userId,
  })

  const { user, isLoadingUser } = useProfilePageUserController({ userId })

  return (
    <>
      <NextSeo title="Perfil | BookWise" />

      <ContainerDuoCol>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSetSearchValue()
                }}
              >
                <label>
                  <TextInput
                    ref={searchInputRef}
                    placeholder="Buscar livro avaliado"
                    onBlur={handleSetSearchValue}
                  />
                </label>
              </form>

              <AvaliationsList>
                {avaliationsPages?.map((page) => (
                  <Fragment key={page?.id}>
                    {page?.items?.map((item) => (
                      <CardAvaliation key={item.id} avaliation={item} />
                    ))}
                  </Fragment>
                ))}

                {isLoadingAvaliations &&
                  skeletonList.map((item) => (
                    <CardAvaliationSkeleton key={item.id} />
                  ))}

                {hasNextPage && (
                  <CardAvaliationSkeleton ref={loadMoreSkeletonRef} />
                )}

                {!isLoadingAvaliations && noResultsFound && (
                  <FeedbackText>{getFeedbackText()}</FeedbackText>
                )}
              </AvaliationsList>
            </AvaliationsSection>

            <AsideRight>
              {user && <ProfileAside user={user} />}
              {(!user || isLoadingUser) && <ProfileAsideSkeleton />}
            </AsideRight>
          </SubMain>
        </Main>
      </ContainerDuoCol>
    </>
  )
}
