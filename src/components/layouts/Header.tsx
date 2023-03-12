import type { FC } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

export const Header: FC = () => {
  const { data: session } = useSession()
  if (!session) {
    return <></>
  }
  const goTop = () => {
    window.location.href = '/'
  }

  const logout = async () => {
    await signOut()
    goTop()
  }

  return (
    <header>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="https://user-images.githubusercontent.com/95541290/184307358-ebf8be63-e434-49d9-8181-90269ad79599.png"
                  alt="T3 Stack のロゴ"
                  onClick={goTop}
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  {/* <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Team
                  </a>

                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Projects
                  </a>

                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Calendar
                  </a> */}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ArrowLeftOnRectangleIcon
                className="h-8 w-8 cursor-pointer p-1 text-gray-400 hover:text-white"
                onClick={logout}
              />
              <Avatar className="m-4 h-8 w-8">
                <AvatarImage
                  src={session?.user?.image as string}
                  alt={`${session?.user?.name as string}のプロフィール画像`}
                />
                <AvatarFallback>GitHubのプロフィール画像</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
