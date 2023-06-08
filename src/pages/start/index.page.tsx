import { Sidebar } from '~/components/Sidebar'

import { AsideRight, ContainerGrid, Main } from '~/components/GridLayout'
import { ChartLineUp } from 'phosphor-react'
import { Heading } from '~/components/Heading'
import { Text } from '~/components/Text'

import { Header, SectionRecentAvaliations } from './styles'
import { CardBookAvaliation } from './components/CardBookAvaliation'
import { BooksSugestionAside } from './components/BooksSugestionAside'

export default function Start() {
  return (
    <ContainerGrid>
      <Sidebar />
      <Main>
        <Header>
          <ChartLineUp size={32} weight="bold" />
          <Heading as="h1" size={'lg'}>
            Inicio
          </Heading>
        </Header>

        <SectionRecentAvaliations>
          <Text>Avaliações mais recentes </Text>
          <CardBookAvaliation />
        </SectionRecentAvaliations>
      </Main>

      <AsideRight>
        <BooksSugestionAside />
      </AsideRight>
    </ContainerGrid>
  )
}
