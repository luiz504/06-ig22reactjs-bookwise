import React from 'react'

import { Container, Content, MetaCol, MetaRow } from './styles'
import { Skeleton } from '~/components/Skeleton'
import { Text } from '~/components/texts'

export const CardAvaliationSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton as={Text} css={{ height: 22, width: 120 }} bg={'gray700'} />

      <Content>
        <MetaRow>
          <Skeleton css={{ height: 134, width: 98, borderRadius: '$xs' }} />

          <MetaCol>
            <Skeleton
              as={Text}
              css={{ height: 25, width: 200, marginBottom: '$1' }}
            />

            <Skeleton as={Text} css={{ height: 25, width: 200 }} />

            <Skeleton
              as={Text}
              css={{ height: 18, width: 120, marginTop: 'auto' }}
            />
          </MetaCol>
        </MetaRow>
        <Skeleton as={Text} css={{ height: 22, marginBottom: '$1' }} />
        <Skeleton as={Text} css={{ height: 22, marginBottom: '$1' }} />
        <Skeleton as={Text} css={{ height: 22 }} />
      </Content>
    </Container>
  )
}
