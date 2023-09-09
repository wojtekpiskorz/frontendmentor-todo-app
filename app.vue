<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
// import nanoid
import { nanoid } from 'nanoid'

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

// new todo

const { todos, handleAddTodo } = useTodos()

const todo = ref('')


function completeTodo(id: string) {
  const index = todos.findIndex((todo) => todo.id === id)
  todos[index].completed = !todos[index].completed
}

function removeTodo(id: string) {
  const index = todos.findIndex((todo) => todo.id === id)
  todos.splice(index, 1)
}

const addTodo = (title: string) => {
  handleAddTodo(title);
  todo.value = '';
}

const uncompletedTodosCount = computed(() => {
  return todos.filter((todo) => !todo.completed).length
})

function deleteCompletedTodos() {
  todos.filter((todo) => todo.completed).forEach((todo) => {
    removeTodo(todo.id)
  })
}

const isUpdating = ref(false)

</script>

<template>
  <div class="todo-app min-h-screen">
    <header class="py-12 px-6 relative w-full flex flex-col gap-12 z-0">
      <img
        v-if="smAndLarger"
        :src="isDark ? headerImages.desktopDark : headerImages.desktopLight"
        class="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <img
        v-else
        :src="isDark ? headerImages.mobileDark : headerImages.mobileLight"
        class="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <nav class=" flex items-center justify-between z-10">
        <NuxtLink
          to="/"
          class="uppercase tracking-wider text-lg text-white"
        >Logo</NuxtLink>
        <button @click="toggleDarkMode">
          <IconSun v-if="isDark" />
          <IconMoon v-if="isLight" />
        </button>
      </nav>
      <!-- Input wrapper -->
      <div class="bg-neutral-dark-200 flex gap-2 items-center rounded-md text-sm py-4 px-6">
        <!-- checkbox wrapper -->
        <div>
          <IconCheck
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
          class="w-full py-2 bg-transparent text-white placeholder-neutral-dark-500 placeholder:font-normal"
          @keydown.enter="addTodo(todo)"
          @keydown.tab="addTodo(todo)"
        />
      </div>

    </header>
    <div class="py-12 px-6 mx-auto z-20 relative">
      <div class="bg-neutral-dark-200  -mt-20 rounded-md  ">
        <ul class="flex flex-col ">
          <li
            v-for="todo in todos"
            :key="todo.id"
            class="px-6 py-3 flex gap-4 justify-between items-center"
          >
            <div>
              <IconCheck v-if="todo.completed" />
              <IconUnchecked
                v-else
                @click="completeTodo(todo.id)"
              />
            </div>
            <p
              :class="todo.completed ? 'line-through text-neutral-dark-500' : ''"
              class="flex-grow"
            >{{ todo.title }}</p>
            <IconCross @click="removeTodo(todo.id)" />
          </li>
        </ul>
        <div class="flex px-6 py-3 justify-between gap-8 items-center text-neutral-dark-500">
          <p>{{ uncompletedTodosCount }} items left</p>
          <button @click="deleteCompletedTodos">Clear Completed</button>
        </div>
        <pre>

          {{ todos }}
        </pre>
      </div>
    </div>
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
  @apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200;
  font-family: var(--font-family-sans-serif);
}
</style> 