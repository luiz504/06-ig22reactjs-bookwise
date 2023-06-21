import { PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer'
import { RefObject } from 'react'

export function onPointerDownOutside(
  e: PointerDownOutsideEvent,
  ref: RefObject<HTMLDivElement>,
) {
  if (!ref.current) return
  const contentRect = ref.current.getBoundingClientRect()
  // Detect if click actually happened within the bounds of content.
  // This can happen if click was on an absolutely positioned element overlapping content,
  // such as the 1password extension icon in the text input.
  const actuallyClickedInside =
    e.detail.originalEvent.clientX > contentRect.left &&
    e.detail.originalEvent.clientX < contentRect.left + contentRect.width &&
    e.detail.originalEvent.clientY > contentRect.top &&
    e.detail.originalEvent.clientY < contentRect.top + contentRect.height
  if (actuallyClickedInside) {
    e.preventDefault()
  }
}
