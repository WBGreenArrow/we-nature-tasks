import { create } from 'zustand'
import { Status } from '../constants'
import { orderingId } from '../utils'

import { data } from '../pages/Tasks/mock'

export interface ITask {
  id: number
  title: string
  desc: string
  status: string
  created_at: string
  updated_at: string
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
    taskRemove: (task: ITask) => void
    taskUpdate: (editedTask: ITask) => void
  }
}

const handleFiterByStatus = (status: string) => {
  if (data.length) {
    const tasksFiltered = data.filter((task) => task.status === status)
    return tasksFiltered
  }
  return []
}

const pending = handleFiterByStatus('pending')
const inProgress = handleFiterByStatus('in progress')
const done = handleFiterByStatus('done')

export const useStore = create<IState & IAction>()((set) => ({
  state: {
    pendingTasks: orderingId(pending),
    inProgressTasks: orderingId(inProgress),
    doneTasks: orderingId(done),
  },

  actions: {
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
