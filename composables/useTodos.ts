import { nanoid } from 'nanoid';
import type { Todo } from '~~/types';

export const useTodos = () => {
  const todos = reactive<Todo[]>([
    { id: nanoid(), title: 'Todo 1', completed: false },
  ])

  const handleAddTodo = (title: string) => {
    todos.push({ id: nanoid(), title, completed: false })

  }

  return { todos, handleAddTodo }
}
