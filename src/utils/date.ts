import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY.MM.DD'
const DATE_TIME_ALL_FORMAT = 'YYYY.MM.DD HH:MM:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
export function formatUtcAllString(
  utcString: string,
  format: string = DATE_TIME_ALL_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}