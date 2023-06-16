import React, { forwardRef } from 'react'

import {
  Container,
  Header,
  UserInfo,
  BookInfoRow,
  BookInfoSection,
} from './styles'
import { Skeleton } from '~/components/skeleton'

export const CardBookAvaliationSkeleton = forwardRef<HTMLDivElement>(
  (_, ref) => {
    return (
      <Container variant={'secondary'} ref={ref}>
        <Header>
          <Skeleton css={{ height: 40, width: 40 }} roundedFull />
          <UserInfo>
            <Skeleton css={{ height: 16, width: 120 }} />

            <Skeleton css={{ height: 16, width: 120, marginTop: '$1' }} />
          </UserInfo>

          <Skeleton css={{ height: 16, width: 100, marginTop: '$1' }} />
        </Header>
        <BookInfoRow>
          <Skeleton css={{ height: 152, width: 108 }} />
          <BookInfoSection>
            <Skeleton css={{ height: 22, width: 120 }} />

            <Skeleton css={{ height: 22, width: 120, marginTop: '$1' }} />

            <Skeleton css={{ height: 16 * 4, marginTop: '$5' }} widthFull />
          </BookInfoSection>
        </BookInfoRow>
      </Container>
    )
  },
)

CardBookAvaliationSkeleton.displayName = 'CardBookAvaliationSkeleton'
