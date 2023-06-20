import { FC } from 'react'

import StarLeft from '~/assets/starLeft.svg'
import StarLeftFilled from '~/assets/starLeftFilled.svg'

import StarRight from '~/assets/starRight.svg'
import StarRightFilled from '~/assets/startRightFilled.svg'

import { Container, BtnRate } from './styles'

export const RATE_OPTIONS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export type RateOption = (typeof RATE_OPTIONS)[number]

type RateAvaliatorProps = {
  value?: number
  disabled?: boolean
  onSelectRate: (value: RateOption) => void
}

export const RateAvaliator: FC<RateAvaliatorProps> = ({
  value = 0,
  disabled = false,
  onSelectRate,
}) => {
  const onSelectRateOption = (weight: number) => {
    if (value === 0.5 && weight === 0.5) {
      onSelectRate(0)
      return
    }
    if (RATE_OPTIONS.includes(weight as RateOption)) {
      onSelectRate(weight as RateOption)
    }
  }

  const clampedRating = Math.max(0, Math.min(value))

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
    <Container className="rate-avaliator">
      {stars.map((star) => (
        <div key={star.weight}>
          <BtnRate
            left
            type="button"
            onClick={() => onSelectRateOption(star.weight - 0.5)}
            disabled={disabled}
          >
            {star.fillPercentage >= 50 ? <StarLeftFilled /> : <StarLeft />}
          </BtnRate>
          <BtnRate
            right
            type="button"
            onClick={() => onSelectRateOption(star.weight)}
            disabled={disabled}
          >
            {star.fillPercentage === 100 ? <StarRightFilled /> : <StarRight />}
          </BtnRate>
        </div>
      ))}
    </Container>
  )
}

RateAvaliator.toString = () => '.rate-avaliator'
