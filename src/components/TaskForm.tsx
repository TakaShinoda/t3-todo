import type { FC, FormEvent } from 'react'
import useStore from '@/store'
import { useMutateTask } from '@/hooks/useMutateTask'

export const TaskForm: FC = () => {
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.taskId === '') {
      createTaskMutation.mutate({
        title: editedTask.title,
        body: editedTask.body,
      })
    } else {
      updateTaskMutation.mutate({
        taskId: editedTask.taskId,
        title: editedTask.title,
        body: editedTask.body,
        done: editedTask.done,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {(updateTaskMutation.isLoading || createTaskMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      <input
        type="text"
        className="mb-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm"
        placeholder="Title"
        value={editedTask.title || ''}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.title}
      </p>
      <textarea
        className="mb-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm"
        placeholder="Body"
        value={editedTask.body || ''}
        onChange={(e) => update({ ...editedTask, body: e.target.value })}
      />
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.body}
      </p>
      {editedTask.taskId && (
        <div className="relative mb-4 flex items-start justify-center px-3 py-2 text-center">
          <div className="flex h-5 items-center">
            <input
              id="Done"
              name="Done"
              type="checkbox"
              onChange={(e) =>
                update({ ...editedTask, done: e.target.checked })
              }
              checked={editedTask.done}
              className="h-4 w-4 rounded-md border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 mb-4 text-sm">
            <label htmlFor="Done" className="font-medium text-gray-700">
              Done
            </label>
          </div>
        </div>
      )}
      <button className="mb-4 rounded bg-blue-600 py-1 px-3 text-white hover:bg-blue-700 focus:outline-none">
        {editedTask.taskId === '' ? 'Create' : 'Update'}
      </button>
    </form>
  )
}
