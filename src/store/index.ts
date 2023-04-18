import { create } from 'zustand'
import { Status } from '../constants'
import { getCurrentDate, orderingId } from '../utils'

import { getTaskListsFromLocalStorage } from '../utils/localStorageUtils'

export interface ITask {
  id?: number
  title: string
  desc: string
  status: string
  created_at?: string
  updated_at?: string
  status_list: 'inProgressTasks' | 'pendingTasks' | 'doneTasks'
}

export interface IState {
  state: {
    [key: string]: ITask[]
    pendingTasks: Array<ITask>
    inProgressTasks: Array<ITask>
    doneTasks: Array<ITask>
  }
}

interface IAction {
  actions: {
    createTask: (task: ITask) => void
    taskUpdate: (editedTask: ITask) => void
    taskRemove: (task: ITask) => void
  }
}

const { pendingTasks, inProgressTasks, doneTasks } = getTaskListsFromLocalStorage()

export const useStore = create<IState & IAction>()((set) => ({
  state: {
    pendingTasks,
    inProgressTasks,
    doneTasks,
  },

  actions: {
    createTask: (dataTask) => {
      set((state) => {
        const { status_list } = dataTask
        const newId = state.state[status_list].length + 1
        const newTaskList = [
          ...state.state[status_list],
          {
            id: newId,
            created_at: getCurrentDate(),
            updated_at: getCurrentDate(),
            ...dataTask,
          },
        ]

        return {
          ...state,
          state: {
            ...state.state,
            [status_list]: orderingId(newTaskList),
          },
        }
      })
    },
    taskRemove: (taskToRemove) => {
      set((state) => {
        let updatedTasks = state.state[taskToRemove.status_list].filter((task) => task.id !== taskToRemove.id)

        return {
          ...state,
          state: {
            ...state.state,
            [taskToRemove.status_list]: updatedTasks,
          },
        }
      })
    },

    taskUpdate: (editedTask) => {
      set((state) => {
        const { id, status_list, status } = editedTask

        const originalTaskIndex = state.state[status_list].findIndex((task) => task.id === id)
        const originalTask = state.state[status_list][originalTaskIndex]
        const prevStatusList = status_list

        let currentTaskList: ITask[] = []
        let newTaskList: ITask[] = []

        if (status !== originalTask.status) {
          currentTaskList = orderingId(state.state[status_list].filter((task) => task.id !== id))
        }

        let statusListToSave = status_list

        if (status === Status.PENDING) {
          statusListToSave = 'pendingTasks'
        } else if (status === Status.IN_PROGRESS) {
          statusListToSave = 'inProgressTasks'
        } else if (status === Status.DONE) {
          statusListToSave = 'doneTasks'
        }

        editedTask.status_list = statusListToSave
        editedTask.updated_at = getCurrentDate()
        newTaskList = state.state[statusListToSave]

        if (status === originalTask.status) {
          currentTaskList = state.state[status_list]
          currentTaskList[originalTaskIndex] = editedTask
          currentTaskList = orderingId(currentTaskList)
        } else {
          newTaskList.push(editedTask)
          newTaskList = orderingId(newTaskList)
        }

        const newState = {
          ...state,
          state: {
            ...state.state,
            [statusListToSave]: newTaskList,
          },
        }

        if (currentTaskList) {
          newState.state[prevStatusList] = currentTaskList
        }

        return newState
      })
    },
  },
}))
