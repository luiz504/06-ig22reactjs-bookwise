import React, { forwardRef } from 'react'

import { Container, Header } from './styles'
import { Skeleton } from '~/components/Skeleton'

export const CardAvaliationSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Container ref={ref}>
      <Header>
        <Skeleton css={{ height: 40, width: 40 }} roundedFull />
        <div className="info-col">
          <Skeleton css={{ height: 20, width: 90, marginBottom: '$1' }} />

          <Skeleton css={{ height: 16, width: 90 }} />
        </div>
        <Skeleton css={{ height: 18, width: 110, marginLeft: 'auto' }} />
      </Header>
      <Skeleton css={{ height: 22, marginBottom: '$1' }} />
      <Skeleton css={{ height: 22 }} />
    </Container>
  )
})

CardAvaliationSkeleton.displayName = 'CardAvaliationSkeleton'
