import { BookOpen, BookmarkSimple } from 'phosphor-react'

import { Text } from '~/components/Text'
import { Skeleton } from '~/components/skeleton'

import {
  CardBookContainer,
  MainInfoRow,
  MainInfoCol,
  ExtraInfoRow,
  ExtraInforCol,
} from './styles'

export const CardBookSkeleton = () => {
  return (
    <CardBookContainer>
      <MainInfoRow>
        <Skeleton css={{ height: 242, width: 171.65 }} />

        <MainInfoCol>
          <Skeleton as="h2" css={{ height: 18, width: '100%' }} />

          <Skeleton as="p" css={{ height: 16, width: '100%' }} />

          <div className="rating-row">
            <Skeleton css={{ height: 20, width: 116 }} />

            <Skeleton as="p" css={{ height: 14, width: 77 }} />
          </div>
        </MainInfoCol>
      </MainInfoRow>

      <ExtraInfoRow>
        <ExtraInforCol>
          <BookmarkSimple weight="bold" size={24} />
          <div>
            <Text size="sm">Categoria</Text>
            <Skeleton as="h2" css={{ height: 22, width: 120 }} />
          </div>
        </ExtraInforCol>

        <ExtraInforCol>
          <BookOpen weight="bold" size={24} />
          <div>
            <Text size="sm">Páginas</Text>
            <Skeleton as="h2" css={{ height: 22, width: 40 }} />
          </div>
        </ExtraInforCol>
      </ExtraInfoRow>
    </CardBookContainer>
  )
}
