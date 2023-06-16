import { NextSeo } from 'next-seo'
import { useQuery } from '@tanstack/react-query'
import { ChartLineUp } from 'phosphor-react'

import { api } from '~/lib/axios'

import { Sidebar } from '~/components/Sidebar'
import { AsideRight } from '~/components/GridLayout'

import { CardBookAvaliation } from './components/CardBookAvaliation'
import { BooksSugestionAside } from './components/BooksSugestionAside'
import { FeedbackText, Heading, Text } from '~/components/texts'

import {
  Container,
  Main,
  Header,
  SectionRecentAvaliations,
  AvaliationsSectAndSuggestionsContainer,
} from './styles'

import { GetAvaliationsResponse } from '../api/avaliations/get.api'

export default function Start() {
  const { data, isLoading } = useQuery({
    queryKey: ['avaliations-recent'],
    queryFn: async () => {
      const { data } = await api.get<GetAvaliationsResponse>('/avaliations/get')
      return data
    },
  })

  // const totalCount = data?.total_count
  const avaliations = data?.items

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

              {avaliations?.map((avaliation) => (
                <CardBookAvaliation key={avaliation.id} data={avaliation} />
              ))}

              {!isLoading && !avaliations?.length && (
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
