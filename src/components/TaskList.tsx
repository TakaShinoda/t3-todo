/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../utils/api";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  // サーバーサイドの関数をリモートプロシージャーコールで呼びに行ってデータを取得
  const { data, isLoading, error } = api.todo.getTasks.useQuery();
  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul>
      {data?.map((task) => (
        <TaskItem
          key={task.id}
          taskId={task.id}
          title={task.title}
          body={task.body}
        />
      ))}
    </ul>
  );
};