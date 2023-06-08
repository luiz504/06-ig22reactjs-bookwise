import { Sidebar } from '~/components/Sidebar'

import { AsideRight, ContainerGrid, Main } from '~/components/GridLayout'

export default function Explore() {
  return (
    <ContainerGrid>
      <Sidebar />
      <Main />
      <AsideRight />
    </ContainerGrid>
  )
}
