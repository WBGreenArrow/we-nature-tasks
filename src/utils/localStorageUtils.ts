import { base64ToUtf8Decode, utf8ToBase64Encode } from '.'
import { IState } from '../store'

export const saveTaskListsToLocalStorage = (taskLists: IState['state']) => {
  const taskListsJsonStr = JSON.stringify(taskLists)
  const taskListsJsonB64 = utf8ToBase64Encode(taskListsJsonStr)

  localStorage.setItem('taskLists', taskListsJsonB64)
}

export const getTaskListsFromLocalStorage = (): IState['state'] => {
  const taskListsBase64 = localStorage.getItem('taskLists')

  if (!taskListsBase64) {
    return {
      pendingTasks: [],
      inProgressTasks: [],
      doneTasks: [],
    }
  }
  return JSON.parse(base64ToUtf8Decode(taskListsBase64 || ''))
}
