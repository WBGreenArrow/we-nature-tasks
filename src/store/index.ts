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
    taskUpdate: (task: ITask) => void
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
    pendingTasks: pending || [],
    inProgressTasks: inProgress || [],
    doneTasks: done || [],
  },

  actions: {
    taskRemove: (taskToRemove: ITask) => {
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

    taskUpdate: (taskEdited: ITask) => {
      set((state) => {
        let taskFinded = state.state[taskEdited.status_list].find((task) => taskEdited.id === task.id)

        let taskListUpdated: Array<ITask>
        let statusTaskListToSave: ITask['status_list'] = 'doneTasks'
        let currentTaskList: Array<ITask> | undefined
        let prevStatusTaskList = taskEdited.status_list

        if (taskEdited.status !== taskFinded?.status) {
          currentTaskList = state.state[taskEdited.status_list].filter((task) => task.id !== taskEdited.id)
          currentTaskList = orderingId(currentTaskList)
        }

        if (taskEdited.status === Status.PENDING) {
          statusTaskListToSave = 'pendingTasks'
        }

        if (taskEdited.status === Status.IN_PROGRESS) {
          statusTaskListToSave = 'inProgressTasks'
        }

        taskEdited.status_list = statusTaskListToSave
        taskListUpdated = state.state[statusTaskListToSave]

        if (taskEdited.status === taskFinded?.status) {
          currentTaskList = state.state[taskEdited.status_list]
          let currentTaskIndex = currentTaskList.findIndex((task) => task.id === taskEdited.id)

          currentTaskList[currentTaskIndex] = taskEdited
          currentTaskList = orderingId(currentTaskList)
        } else {
          taskListUpdated.push(taskEdited)
          taskListUpdated = orderingId(taskListUpdated)
        }

        const newState = {
          ...state,
          state: {
            ...state.state,
            [statusTaskListToSave]: taskListUpdated,
          },
        }

        if (currentTaskList) {
          newState.state[prevStatusTaskList] = currentTaskList
        }

        return newState
      })
    },
  },
}))
