<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Todo } from '~~/types'
import draggable from 'vuedraggable'
import { nanoid } from 'nanoid';

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
const isLight = computed(() => colorMode.value === 'light')

function toggleDarkMode() {
  if (isDark.value) {
    colorMode.value = 'light'
  } else {
    colorMode.value = 'dark'
  }
}

const headerImages = ref({
  mobileDark: "/img/bg-mobile-dark.jpg",
  mobileLight: "/img/bg-mobile-light.jpg",
  desktopDark: "/img/bg-desktop-dark.jpg",
  desktopLight: "/img/bg-desktop-light.jpg",
})


const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger

const { todos, addTodo, todo } = useTodos()



function completeTodo(id: string) {
  const index = todos.value.findIndex((todo) => todo.id === id)
  todos.value[index].completed = !todos.value[index].completed
}

function removeTodo(id: string) {
  const index = todos.value.findIndex((todo) => todo.id === id)
  todos.value.splice(index, 1)
}

const uncompletedTodosCount = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length
})

function deleteCompletedTodos() {
  todos.value.filter((todo) => todo.completed).forEach((todo) => {
    removeTodo(todo.id)
  })
}

const updatedTodos = ref(todos.value)



const isFiltered = ref('all')

const showAllTodos = () => {
  isFiltered.value = 'all'
  updatedTodos.value = todos.value
}

const showActiveTodos = () => {
  isFiltered.value = 'active'
  updatedTodos.value = todos.value.filter((todo) => !todo.completed)
}

const showCompletedTodos = () => {
  isFiltered.value = 'completed'
  updatedTodos.value = todos.value.filter((todo) => todo.completed)
}



</script>

<template>
  <div class="todo-app min-h-screen">
    <header class="py-12  relative w-full  z-0 shadow-md">
      <div class="max-w-xl px-6 mx-auto w-full flex flex-col gap-6">
        <img
          v-if="smAndLarger"
          :src="isDark ? headerImages.desktopDark : headerImages.desktopLight"
          class="absolute inset-0 w-full h-[300px] object-cover -z-10"
          alt="Mountains and sky"
        />
        <img
          v-else
          :src="isDark ? headerImages.mobileDark : headerImages.mobileLight"
          class="absolute inset-0 w-full h-[200px] object-cover -z-10"
          alt="Mountains and sky"
        />
        <nav class=" flex items-center justify-between z-10">
          <NuxtLink
            to="/"
            class="uppercase tracking-widest text-3xl  text-white"
          >
            <h1 aria-label="todo application">
              <IconLogo />
            </h1>
          </NuxtLink>
          <button
            :aria-label="`turn ${!isDark ? 'dark' : 'light'} mode`"
            @click="toggleDarkMode"
          >
            <IconSun v-if="isDark" />
            <IconMoon v-if="isLight" />
          </button>
        </nav>
        <!-- Input wrapper -->
        <div class="bg-white dark:bg-neutral-dark-200 flex gap-2 items-center rounded-md text-sm py-4 px-6">
          <!-- checkbox wrapper -->
          <div>
            <IconCheck
              class="cursor-pointer"
              @click="addTodo(todo)"
              v-if="todo"
            />
            <IconUnchecked v-else />
          </div>
          <!-- input -->
          <input
            v-model="todo"
            type="text"
            placeholder="Create a new todo..."
            class="w-full py-2 bg-transparent dark:text-white placeholder-neutral-dark-500 placeholder:font-normal"
            @keydown.enter="addTodo(todo)"
            @keydown.tab="addTodo(todo)"
          />
        </div>

      </div>

    </header>
    <!-- Start Todo List -->
    <main class="py-12 px-6 mx-auto z-20 relative flex flex-col gap-6 max-w-xl">
      <div class="bg-white dark:bg-neutral-dark-200  -mt-20 rounded-md  shadow-md">
        <draggable
          v-model="updatedTodos"
          group="todos"
          item-key="title"
          :animation="150"
          class="flex flex-col"
          @end="todos = updatedTodos"
          tag="ul"
        >
          <template #item="{ element: todo }: { element: Todo }">
            <li
              class="px-6 py-4 border-b-neutral-light-200 dark:border-b-neutral-dark-700 border-solid border-b flex gap-4 justify-between items-center"
            >
              <div>
                <IconCheck v-if=" todo.completed " />
                <IconUnchecked
                  v-else
                  @click="completeTodo(todo.id)"
                />
              </div>
              <span
                :class=" todo.completed ? 'line-through text-neutral-dark-500' : '' "
                class="flex-grow"
              >{{ todo.title }}</span>
              <IconCross
                class=" cursor-pointer"
                @click="removeTodo(todo.id)"
              />
            </li>
          </template>

        </draggable>


        <div class="flex px-6 py-3 justify-between gap-8 items-center text-neutral-dark-500">
          <p aria-label="Uncompleted todos count">{{ uncompletedTodosCount }} items left</p>
          <button @click=" deleteCompletedTodos ">Clear Completed</button>
        </div>

      </div>

      <!-- End Todo List -->
      <div class="bg-white dark:bg-neutral-dark-200 rounded-md  px-6 py-3 shadow-md">
        <div class="flex gap-4 items-center justify-center">
          <button
            :class=" { 'text-primary-bright-blue': isFiltered === 'all' } "
            @click=" showAllTodos "
            class="text-neutral-dark-500"
            aria-label="Show all todos"
          >All</button>
          <button
            :class="
              { 'text-primary-bright-blue': isFiltered === 'active' }
            "
            @click=" showActiveTodos "
            class="
          text-neutral-dark-500"
            aria-label="Show active todos"
          >Active</button>
          <button
            aria-label="Show completed todos"
            :class="
              { 'text-primary-bright-blue': isFiltered === 'completed' }
            "
            @click=" showCompletedTodos "
            class="
          text-neutral-dark-500"
          >Completed</button>
        </div>
      </div>

    </main>
    <!-- Start tabs -->


  </div>
</template>

<style lang="postcss">
/* import Josefin Sans 400 and 700 */

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');

/* set the root font to Josefin Sans */

:root {
  --font-family-sans-serif: 'Josefin Sans', sans-serif;
}


body {
  @apply min-h-screen bg-gray-50 dark:bg-neutral-dark-100 dark:text-gray-200;
  font-family: var(--font-family-sans-serif);
}
</style> 