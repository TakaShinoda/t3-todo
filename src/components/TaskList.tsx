import { api } from '@/utils/api'
import { TaskItem } from '@/components/TaskItem'

export const TaskList = () => {
  // サーバーサイドの関数をリモートプロシージャーコールで呼びに行ってデータを取得
  const { data, isLoading, error } = api.todo.getTasks.useQuery()
  if (isLoading) {
    return <p>Loading task list...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return (
    <div className="my-4 min-w-full px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Done
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((task) => (
                  <TaskItem
                    key={task.id}
                    taskId={task.id}
                    title={task.title}
                    body={task.body}
                    done={task.done}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
