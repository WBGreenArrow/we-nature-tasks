import { create } from 'zustand'

interface ITask {
  id: number
  title: string
  desc: string
  status: string
  created_at: string
  updated_at: string
}

interface IState {
  state: {
    peddingTasks: Array<ITask>
    inProgressTasks: Array<ITask>
    doneTasks: Array<ITask>
  }
}

interface IAction {
  actions: {
    setPeddingTasks: (tasks: IState['state']['peddingTasks']) => void
    setInProgressTasks: (tasks: IState['state']['inProgressTasks']) => void
    setDoneTasks: (tasks: IState['state']['doneTasks']) => void
    removeTaskById: (id: number) => void
  }
}

export const useStore = create<IState & IAction>()((set) => ({
  state: {
    peddingTasks: [],
    inProgressTasks: [],
    doneTasks: [],
  },

  actions: {
    setPeddingTasks: (tasks: Array<ITask>) => {
      set((state) => ({
        ...state,
        state: {
          ...state.state,
          peddingTasks: tasks,
        },
      }))
    },
    setInProgressTasks: (tasks: Array<ITask>) => {
      set((state) => ({
        ...state,
        state: {
          ...state.state,
          inProgressTasks: tasks,
        },
      }))
    },
    setDoneTasks: (tasks: Array<ITask>) => {
      set((state) => ({
        ...state,
        state: {
          ...state.state,
          doneTasks: tasks,
        },
      }))
    },

    removeTaskById: (id) => {
      set((state) => {
        let updatedPendingTasks = state.state.peddingTasks.filter((task) => task.id !== id)
        let updatedInProgressTasks = state.state.inProgressTasks.filter((task) => task.id !== id)
        let updatedDoneTasks = state.state.doneTasks.filter((task) => task.id !== id)

        return {
          ...state,
          state: {
            ...state.state,
            peddingTasks: updatedPendingTasks,
            inProgressTasks: updatedInProgressTasks,
            doneTasks: updatedDoneTasks,
          },
        }
      })
    },
  },
}))
