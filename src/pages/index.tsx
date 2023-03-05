import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Auth } from '@/components/Auth'
import { Layout } from '@/components/layouts/Layout'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    )
  }
  return (
    <Layout title="Todo App">
      <Avatar className="h-48 w-48 border-2 border-cyan-500">
        <AvatarImage
          src={session?.user?.image as string}
          alt={`${session?.user?.name as string}のプロフィール画像`}
        />
        <AvatarFallback>GitHubのプロフィール画像</AvatarFallback>
      </Avatar>
      <p className="my-5 text-2xl text-zinc-800">{session?.user?.name}</p>
      <TaskForm />
      <TaskList />
    </Layout>
  )
}

export default Home
