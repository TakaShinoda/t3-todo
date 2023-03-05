import useStore from '@/store'
import { api } from '@/utils/api'
import { useToast } from '@/hooks/useToast'


export const useMutateTask = () => {
  const utils = api.useContext()
  const reset = useStore((state) => state.resetEditedTask)
  const { toast } = useToast()

  const createTaskMutation = api.todo.createTask.useMutation({
    onSuccess: (res) => {
      // 既存のtodoのキャッシュを取得
      const prevTodos = utils.todo.getTasks.getData()
      if(prevTodos) {
        utils.todo.getTasks.setData(undefined, [res, ...prevTodos])
      }
      reset()
      console.log(res)
      toast({
        title: "Create",
        description: `${res.title} を作成しました`,
      })
    },
  })
  const updateTaskMutation = api.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const prevTodos = utils.todo.getTasks.getData()
      if(prevTodos) {
        utils.todo.getTasks.setData(undefined,
          prevTodos.map((task) => (task.id === res.id ? res : task))
        )
      }
      reset()
      toast({
        title: "Update",
        description: `${res.title} を更新しました`,
      })
    }
  })
  const deleteTaskMutation = api.todo.deleteTask.useMutation({
    //第1引数: deleteTaskの戻り値
    //第2引数: deleteTaskに渡されたinputの引数の値
    onSuccess: (_, variables) => {
      const prevTodos = utils.todo.getTasks.getData()
      if(prevTodos) {
        utils.todo.getTasks.setData(undefined,
          prevTodos.filter((task) => task.id !== variables.taskId)
        )
      }
      reset()
      toast({
        title: "Delete",
        description: "削除",
      })
    }
  })

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
