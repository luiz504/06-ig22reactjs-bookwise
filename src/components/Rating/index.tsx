import { Star } from 'phosphor-react'
import React, { useMemo } from 'react'

import { Container } from './styles'

interface RatingProps {
  starsAmount?: number
  rating: number
  style?: React.CSSProperties
}

export const Rating = ({ starsAmount = 5, rating, style }: RatingProps) => {
  const stars = useMemo(() => {
    if (starsAmount > 5) {
      return Array.from({ length: 5 }, (_, index) => ({
        weight: index + 1,
      }))
    }
    return Array.from({ length: starsAmount }, (_, index) => ({
      weight: index + 1,
    }))
  }, [starsAmount])

  if (starsAmount < 1) {
    return null
  }

  return (
    <Container style={style} className={'rating-container'}>
      {stars.map((star) => (
        <Star
          key={star.weight}
          weight={star.weight > rating ? 'bold' : 'fill'}
        />
      ))}
    </Container>
  )
}

Rating.toString = () => '.rating-container'
