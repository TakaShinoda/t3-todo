import { createTRPCRouter } from './trpc'
import { todoRouter } from './routers/todo'

export const appRoute = createTRPCRouter({
  todo: todoRouter
})

export type AppRouter = typeof appRoute
