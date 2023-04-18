import { ITask } from '../store'

export const orderingId = (array: Array<any>) => {
  const newArrayOrdered = array.map((item, key) => ({ ...item, id: key + 1 }))
  return newArrayOrdered
}

export const filterByValue = (value: string, taskList: ITask[]) => {
  const valueFormated = value.toLowerCase()
  const taskListFiltered = taskList.filter((item) => {
    item.updated_at = formatDate(item.updated_at || '')

    const valueToFilter = Object.values(item)
    valueToFilter.shift()

    const itemValue = valueToFilter.join(' ').toLowerCase()

    return itemValue.includes(valueFormated)
  })

  return taskListFiltered
}

export const getCurrentDate = () => {
  const date = new Date()
  return date.toISOString()
}

export const formatDate = (date: string) => {
  const newDate = new Date(date)
  const formattedDate = newDate.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return formattedDate
}

export const utf8ToBase64Encode = (str: string): string => {
  return window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt('0x' + p1, 16))),
  )
}

export const base64ToUtf8Decode = (b64: string): string => {
  return decodeURIComponent(
    window
      .atob(b64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}
