import { ComponentProps, Fragment, useRef } from 'react'
import { X } from 'phosphor-react'

import { useSkeletonListGenerator } from '~/hooks/useSkeletonListGenetator'
import { onPointerDownOutside } from '~/utils/onPointerDownOutside'

import { Text } from '~/components/texts'
import { Button } from '~/components/Button'
import { CardBook, CardBookSkeleton } from './components/CardBook'
import {
  CardAvaliation,
  CardAvaliationSkeleton,
} from './components/CardAvaliation'
import { CardAvaliator } from './components/CardAvaliator'
import { SignInModal } from '../SignInModal'

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

import {
  useAvaliationsController,
  useBookController,
  useComponentsController,
} from './controllers'

type CommentSidebarProps = ComponentProps<typeof Root>

export const CommentSidebar = (props: CommentSidebarProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    loggedUserId,
    isOpenModalSignIn,
    handleCloseSignInModal,
    isOpenAvaliator,
    handleOpenAvaliator,
    handleCloseAvaliator,
  } = useComponentsController()

  const { bookData, isLoadingBook, bookId, refetchBook } = useBookController()

  const {
    userAvaliation,
    avaliationPages,
    isLoadingAvaliations,
    hasNextAvaliationsPage,
    refetchAvaliations,
    loadMoreRef,
  } = useAvaliationsController({
    bookId,
    loggedUserId,
  })

  const showBtnCreateAvaliation =
    !isLoadingAvaliations && bookId && !userAvaliation && !isOpenAvaliator

  const avalationsSkeletonList = useSkeletonListGenerator(3)

  function onSuccessCreateAvaliation() {
    refetchBook()
    refetchAvaliations()
  }

  return (
    <>
      <Root {...props}>
        <Portal>
          <Overlay />
          <Content
            ref={contentRef}
            onPointerDownOutside={(e) => onPointerDownOutside(e, contentRef)}
          >
            <CloseBtn>
              <X weight="bold" size={15} />
            </CloseBtn>

            {isLoadingBook && <CardBookSkeleton />}

            {!isLoadingBook && !!bookData && <CardBook book={bookData} />}

            <AvaliationsSection>
              <AvaliationLabelAndActions>
                <Text size={'sm'}>Avaliações</Text>

                {showBtnCreateAvaliation && (
                  <Button variant={'secondary'} onClick={handleOpenAvaliator}>
                    Avaliar
                  </Button>
                )}
              </AvaliationLabelAndActions>

              <AvaliationsList>
                {isLoadingAvaliations &&
                  avalationsSkeletonList.map((val) => (
                    <CardAvaliationSkeleton key={val.id} />
                  ))}

                {isOpenAvaliator && !!bookId && (
                  <CardAvaliator
                    bookId={bookId}
                    onClose={handleCloseAvaliator}
                    onSuccess={onSuccessCreateAvaliation}
                  />
                )}

                {userAvaliation && (
                  <CardAvaliation avaliation={userAvaliation} />
                )}

                {avaliationPages?.map((page, i) => (
                  <Fragment key={`page-${i}`}>
                    {page?.items.map((aval) => (
                      <CardAvaliation key={aval.id} avaliation={aval} />
                    ))}
                  </Fragment>
                ))}

                {hasNextAvaliationsPage && (
                  <CardAvaliationSkeleton ref={loadMoreRef} />
                )}
              </AvaliationsList>
            </AvaliationsSection>
          </Content>
        </Portal>
      </Root>

      {isOpenModalSignIn && (
        <SignInModal
          open={isOpenModalSignIn}
          onOpenChange={handleCloseSignInModal}
        />
      )}
    </>
  )
}
