import { styled, theme } from '~/styles'

type FontSizesKeys = keyof typeof theme.fontSizes
const sizes = Object.keys(theme.fontSizes).reduce((acc, fontSizeKey, index) => {
  acc[fontSizeKey as FontSizesKeys] = { fontSize: `$${fontSizeKey}` }
  return acc
}, {} as Record<FontSizesKeys, { fontSize: string }>)

export const Text = styled('p', {
  fontFamily: '$default',
  fontWeight: '$regular',
  color: '$gray100',
  variants: {
    size: sizes,
  },
  defaultVariants: {
    size: 'md',
  },
})

Text.displayName = 'Text'
