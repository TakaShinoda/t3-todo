/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createTaskSchema, getSingleTaskSchema, updateTaskSchema, deleteTaskSchema } from '../../../schema/todo'
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'


export const todoRouter = createTRPCRouter({
  // 作成: mutation
  createTask: protectedProcedure.input(createTaskSchema).mutation(
    async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id
            }
          }
        }
      })
      return task
    }),
  // 取得: query
  // github認証はいらない仕様としてpublicProcedure (いる場合はprotectedProcedureにする)
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session?.user?.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }),

  getSingleTask: protectedProcedure.input(getSingleTaskSchema).query(({ ctx, input }) => {
    return ctx.prisma.task.findUnique({
      where: {
        id: input.taskId
      }
    })
  }),

  updateTask: protectedProcedure.input(updateTaskSchema).mutation(
    async ({ ctx, input }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: input.taskId
        },
        data: {
          title: input.title,
          body: input.body
        }
      })
      return task
    }),

   deleteTask: protectedProcedure.input(deleteTaskSchema).mutation(
    async ({ ctx, input }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.taskId
        }
      })
   }),
})
