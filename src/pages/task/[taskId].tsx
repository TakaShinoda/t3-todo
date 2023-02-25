import Link from "next/link"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid"
import { api } from "../../utils/api"
import { Layout } from "../../components/layouts/Layout"

const SingleTaskPage: NextPage = () => {
  const router = useRouter()
  const taskId = router.query.taskId as string
  const { data, isLoading, error } = api.todo.getSingleTask.useQuery({
    taskId,
  })
  if (isLoading) {
    return <Layout title="Task Detail">Loading...</Layout>
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>
  }
  return (
    <Layout title="Task Detail">
      <div className="min-w-full overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {data?.title}
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Body</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.body}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">updatedAt</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data &&
                  format(new Date(data.updatedAt), "yyyy-MM-dd HH:mm:ss")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">createdAt</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data &&
                  format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <Link href={`/`}>
                <ArrowUturnLeftIcon className="h-5 w-5 cursor-pointer text-blue-600" />
              </Link>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  )
}
export default SingleTaskPage
