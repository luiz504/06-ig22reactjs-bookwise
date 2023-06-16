import dayjs from 'dayjs'

type DateFormaterResult = {
  distanceFromNow: string | null
  createdTimeTitle: string | null
  createdDateTime: string | null
}
export const useDateFormatter = (date: Date | string): DateFormaterResult => {
  const parsedDate = dayjs(date)

  if (parsedDate.isValid()) {
    const distanceFromNow = dayjs().to(parsedDate)
    const createdTimeTitle = parsedDate.format('YYYY-MM-DD[ às ]HH:mm[h]')
    const createdDateTime = parsedDate.format()

    return { distanceFromNow, createdTimeTitle, createdDateTime }
  }

  return {
    distanceFromNow: null,
    createdTimeTitle: null,
    createdDateTime: null,
  }
}
