import { styled, theme } from '~/styles'

type FontSizesKeys = keyof typeof theme.fontSizes
const sizes = Object.keys(theme.fontSizes).reduce((acc, fontSizeKey, index) => {
  acc[fontSizeKey as FontSizesKeys] = { fontSize: `$${fontSizeKey}` }
  return acc
}, {} as Record<FontSizesKeys, { fontSize: string }>)

type ColorsKeys = keyof typeof theme.colors
const colors = Object.keys(theme.colors).reduce((acc, colorsTokens, index) => {
  acc[colorsTokens as ColorsKeys] = { color: `$${colorsTokens}` }
  return acc
}, {} as Record<ColorsKeys, { color: string }>)

export const Text = styled('p', {
  fontFamily: '$default',
  fontWeight: '$regular',

  variants: {
    size: sizes,
    color: colors,
  },
  defaultVariants: {
    size: 'md',
    color: 'gray100',
  },
})

Text.displayName = 'Text'
