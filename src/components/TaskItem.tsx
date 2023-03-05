import type { FC } from 'react'
import Link from 'next/link'
import useStore from '@/store'
import type { UpdateTaskInput } from '@/schema/todo'
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useMutateTask } from '@/hooks/useMutateTask'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog'

export const TaskItem: FC<UpdateTaskInput> = ({
  taskId,
  title,
  body,
  done,
}) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  const deleteTask = () => {
    deleteTaskMutation.mutate({ taskId })
  }
  const trimStr = (str: string) => {
    if (str.length < 10) {
      return str
    }
    return `${str.substring(0, 9)}...`
  }
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <Link href={`/task/${taskId}`}>{title}</Link>
      </td>
      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
        {trimStr(body)}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium">
        {done && <CheckIcon className="h-5 w-5 text-emerald-400" />}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            update({
              taskId,
              title,
              body,
              done,
            })
          }}
        />
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Dialog>
          <DialogTrigger asChild>
            <TrashIcon className="h-5 w-5 cursor-pointer text-blue-600" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <DialogTitle>Delete task</DialogTitle>
              <DialogDescription>{`${title} を削除します`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <DialogClose asChild>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={deleteTask}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  )
}
