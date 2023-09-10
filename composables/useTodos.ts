import { nanoid } from 'nanoid';
import type { Todo } from '~~/types';

export const useTodos = () => {
  const todos = useLocalStorage<Todo[]>('todos', [
    { id: nanoid(), title: 'Todo 1', completed: false },
  ])


  const addTodo = (title: string) => {
    todos.value.push({ id: nanoid(), title, completed: false })
    todo.value = ''
  }

  const todo = useLocalStorage<string>('todo', '')

  return { todos, addTodo, todo }
}
