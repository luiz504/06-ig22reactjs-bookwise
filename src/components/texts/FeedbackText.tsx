import { styled } from '~/styles'
import { Text } from './Text'

export const FeedbackText = styled(Text, {
  color: '$gray300',

  strong: {
    fontStyle: 'italic',
    color: '$purple100',
    fontSize: '$md',
  },
})
