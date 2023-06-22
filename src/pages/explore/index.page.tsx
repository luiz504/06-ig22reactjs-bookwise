import { Fragment } from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { Binoculars } from 'phosphor-react'

import { buildQueryParams } from '~/utils'

import { Rating } from '~/components/Rating'
import { Heading, Text, FeedbackText } from '~/components/texts'
import { Sidebar } from '~/components/Sidebar'
import { TextInput } from '~/components/TextInput'
import { CommentSidebar } from './components/CommentSidebar'
import { Skeleton } from '~/components/Skeleton'

import {
  Container,
  Main,
  Header,
  TopicsList,
  TopicItem,
  BooksGridList,
  ItemInfoCol,
  SugestionItem,
} from './styles'

import { useExplorePageController } from './controller'

export default function Explore() {
  const {
    handleSubmit,
    inputSearchRef,
    search,
    category,
    isLoadingCategories,
    categories,
    skeletonList,
    isLoadingBooks,
    isSuccessBooks,
    booksPages,
    hasNextPage,
    loadMoreSkeletonRef,
    getFeedbackMessage,
    isOpenBookSidebar,
    handleCloseBookSidebar,
  } = useExplorePageController()

  return (
    <>
      <NextSeo title="Explorar | BookWise" />

      <Container>
        <Sidebar />
        <Main>
          <Header as="form" onSubmit={handleSubmit}>
            <Heading>
              <Binoculars weight="bold" />
              Explorar
            </Heading>

            <TextInput
              ref={inputSearchRef}
              placeholder="Buscar livro ou autor"
              defaultValue={search}
            />
          </Header>

          <TopicsList>
            {isLoadingCategories &&
              skeletonList.map((cat) => (
                <Skeleton
                  key={cat.id}
                  css={{ height: 36, width: 120 }}
                  roundedFull
                  bg={'gray700'}
                />
              ))}

            {!isLoadingCategories && (
              <>
                <TopicItem
                  href={{
                    pathname: '/explore',
                    query: buildQueryParams({ search }),
                  }}
                  active={!category}
                >
                  Tudo
                </TopicItem>

                {categories?.map((cat) => (
                  <TopicItem
                    href={{
                      pathname: '/explore',
                      query: buildQueryParams({
                        category: cat.name,
                        search,
                      }),
                    }}
                    active={category === cat.name}
                    prefetch={false}
                    key={cat.id}
                  >
                    {cat.name}
                  </TopicItem>
                ))}
              </>
            )}
          </TopicsList>

          <BooksGridList>
            {isLoadingBooks &&
              skeletonList.map((s) => (
                <Skeleton
                  key={s.id}
                  css={{ height: 188, borderRadius: '$md' }}
                  bg={'gray700'}
                />
              ))}

            {!isLoadingBooks && (
              <>
                {booksPages?.map((page) => (
                  <Fragment key={page.id}>
                    {page.items.map((book) => (
                      <SugestionItem
                        key={book.id}
                        size="sm"
                        variant={'secondary'}
                        as={Link}
                        href={{
                          pathname: '/explore',
                          query: buildQueryParams({
                            search,
                            category,
                            bookOpenId: book.id,
                          }),
                        }}
                      >
                        <Image
                          src={book.cover_url.replace('public', '')}
                          height={152}
                          width={108}
                          alt="book"
                        />

                        <ItemInfoCol>
                          <Heading size="sm">{book.name}</Heading>
                          <Text size="sm">{book.author}</Text>

                          <Rating rating={book.ratings_average} />
                        </ItemInfoCol>
                      </SugestionItem>
                    ))}
                  </Fragment>
                ))}

                {!booksPages?.length && isSuccessBooks && (
                  <FeedbackText size="sm">{getFeedbackMessage()}</FeedbackText>
                )}
              </>
            )}
            {hasNextPage && (
              <Skeleton
                ref={loadMoreSkeletonRef}
                css={{ height: 188, borderRadius: '$md' }}
                bg={'gray700'}
              />
            )}
          </BooksGridList>
        </Main>
      </Container>

      {isOpenBookSidebar && (
        <CommentSidebar open={true} onOpenChange={handleCloseBookSidebar} />
      )}
    </>
  )
}
