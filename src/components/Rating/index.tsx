import React from 'react'

import { Container } from './styles'
import { CSS } from '@stitches/react'
import { Star } from '../Star'

interface RatingProps {
  starsAmount?: number
  rating: number
  style?: React.CSSProperties
  css?: CSS
}

export const Rating = ({ rating, css }: RatingProps) => {
  const clampedRating = Math.max(0, Math.min(rating))

  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage =
      index < Math.floor(clampedRating)
        ? 100
        : index === Math.floor(clampedRating)
        ? (clampedRating % 1) * 100
        : 0
    return {
      weight: index + 1,
      fillPercentage,
    }
  })

  return (
    <Container
      title={`Avaliação: ${rating}`}
      className={'rating-container'}
      css={css}
    >
      {stars.map((star) => (
        <Star key={star.weight} fillPercentage={star.fillPercentage} />
      ))}
    </Container>
  )
}

Rating.toString = () => '.rating-container'
