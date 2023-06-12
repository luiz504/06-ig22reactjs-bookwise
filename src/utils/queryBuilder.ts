type QueryOptions = {
  [key: string]: string | undefined
}

export const queryBuilder = (queryOptions: {
  [key: string]: string | undefined
}) => {
  if (typeof queryOptions !== 'object' || queryOptions === null) {
    throw new Error('Invalid query options. Expected an object.')
  }
  const query = new Map<string, string>()

  Object.entries(queryOptions).forEach(([key, value]) => {
    if (typeof key !== 'string') {
      throw new Error('Invalid query option key. Expected a string.')
    }

    if (value !== '' && value !== undefined) {
      query.set(key, value)
    }
  })
  return Object.fromEntries(query) as QueryOptions
}
