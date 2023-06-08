import { Sidebar } from '~/components/Sidebar'

import { ContainerGrid, AsideRight, Main } from '~/components/GridLayout'

export default function Profile() {
  return (
    <ContainerGrid>
      <Sidebar />
      <Main />
      <AsideRight />
    </ContainerGrid>
  )
}
