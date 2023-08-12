import { ColumnProps } from '@/store/testData'

export function generateFitUrl(column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl =
      column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

interface CheckCondition {
  format?: string[]
  size?: number
}
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
interface TestProps {
  _id: string
  name: string
}

export const arrToObj = <T extends { id?: string }>(arr: Array<T>) => {
  return arr.reduce(
    (prev, current) => {
      if (current.id) {
        prev[current.id] = current
      }
      return prev
    },
    {} as { [key: string]: T }
  )
}

export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key])
}
// const result2 = objToArr(testData2)
// console.log(result2)
