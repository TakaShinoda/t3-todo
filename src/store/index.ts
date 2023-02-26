import create from "zustand"
import type { UpdateTaskInput } from '@/schema/todo'

type State = {
  editedTask: UpdateTaskInput
  updateEditedTask: (payload: UpdateTaskInput) => void
  resetEditedTask: () => void
}


const useStore = create<State>((set) => ({
  editedTask: {
    taskId: '',
    title: '',
    body: '',
    done: false
  },
  updateEditedTask: (payload) => set({
    editedTask: payload
  }),
  resetEditedTask: () => set({
    editedTask: {
      taskId: '',
      title: '',
      body: '',
      done: false
    },
  })
}))

export default useStore
