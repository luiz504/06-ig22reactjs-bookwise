import { Fragment, useEffect, useRef } from 'react'
import { NextSeo } from 'next-seo'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChartLineUp } from 'phosphor-react'

import { api } from '~/lib/axios'
import { useIntersection } from '~/hooks/useIntersection'
import { useSkeletonListGenerator } from '~/hooks/useSkeletonListGenetator'

import { Sidebar } from '~/components/Sidebar'
import { AsideRight } from '~/components/GridLayout'
import { CardBookAvaliation } from './components/CardBookAvaliation'
import { BooksSugestionAside } from './components/BooksSugestionAside'
import { FeedbackText, Heading, Text } from '~/components/texts'
import { CardBookAvaliationSkeleton } from './components/CardBookAvaliation/skeleton'

import {
  Container,
  Main,
  Header,
  SectionRecentAvaliations,
  AvaliationsSectAndSuggestionsContainer,
} from './styles'

import {
  GetAvaliationsParams,
  GetAvaliationsResponse,
} from '../api/avaliations/get.api'

export default function Start() {
  const { data, isLoading, fetchNextPage, isInitialLoading, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['avaliations-recent'],
      queryFn: async ({ pageParam }) => {
        const params: GetAvaliationsParams = {
          per_page: 5,
          page: pageParam,
        }
        const { data } = await api.get<GetAvaliationsResponse>(
          '/avaliations/get',
          { params },
        )
        return data
      },
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasNextPage) {
          return pages.length + 1
        }
      },
    })

  const skeletonList = useSkeletonListGenerator(3)

  const pages = data?.pages

  const loadMoreSkeletonRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: loadMoreSkeletonRef.current,
    threshold: 1,
    rootMargin: '450px',
  })

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      fetchNextPage()
    }
  }, [entry, isLoading, fetchNextPage])

  return (
    <>
      <NextSeo title="Início | BookWise" />

      <Container>
        <Sidebar />
        <Main>
          <Header>
            <ChartLineUp size={32} weight="bold" />
            <Heading as="h1" size={'lg'}>
              Inicio
            </Heading>
          </Header>

          <AvaliationsSectAndSuggestionsContainer>
            <SectionRecentAvaliations>
              <Text>Avaliações mais recentes </Text>
              {isInitialLoading &&
                skeletonList.map((item) => (
                  <CardBookAvaliationSkeleton key={item.id} />
                ))}

              {pages?.map((page, i) => (
                <Fragment key={i}>
                  {page.items.map((item) => (
                    <CardBookAvaliation key={item.id} data={item} />
                  ))}
                </Fragment>
              ))}

              {hasNextPage && <CardBookAvaliationSkeleton ref={ref} />}

              {!isLoading && !pages?.length && (
                <FeedbackText size="sm">
                  Não foram encontradas avaliações.
                </FeedbackText>
              )}
            </SectionRecentAvaliations>

            <AsideRight>
              <BooksSugestionAside />
            </AsideRight>
          </AvaliationsSectAndSuggestionsContainer>
        </Main>
      </Container>
    </>
  )
}
