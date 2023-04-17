import { ITask } from '../store'

export const orderingId = (array: Array<any>) => {
  const newArrayOrdered = array.map((item, key) => ({ ...item, id: key + 1 }))
  return newArrayOrdered
}

export const filterByValue = (value: string, taskList: ITask[]) => {
  const valueFormated = value.toLowerCase()
  const taskListFiltered = taskList.filter((item) => {
    const valueToFilter = Object.values(item)

    valueToFilter.shift()

    const itemValue = valueToFilter.join(' ').toLowerCase()

    return itemValue.includes(valueFormated)
  })

  return taskListFiltered
}
