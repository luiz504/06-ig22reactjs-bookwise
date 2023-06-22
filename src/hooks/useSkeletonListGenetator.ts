import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function generateSkeletonList(length = 0) {
  try {
    return Array.from({ length }, () => ({
      id: uuidv4(),
    }))
  } catch (error) {
    console.error('Error generating skeleton list:', error) //eslint-disable-line
    return []
  }
}

export function useSkeletonListGenerator(length = 0) {
  return useState(generateSkeletonList(length))[0]
}
