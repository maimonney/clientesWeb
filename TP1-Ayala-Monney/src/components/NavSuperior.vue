<template>
    <nav class="bg-white border-b border-gray-300 p-4 fixed top-0 left-0 w-full z-10">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Icono de Perfil -->
        <button class="text-gray-800 hover:text-blue-600">
          <UserIcon class="h-6 w-6" />
        </button>
  
        <!-- Botón para agregar publicaciones -->
        <button class="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
          <PlusIcon class="h-6 w-6" />
        </button>
  
        <!-- Icono para ver publicaciones -->
        <button class="text-gray-800 hover:text-blue-600">
          <EyeIcon class="h-6 w-6" />
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  import { UserIcon, PlusIcon, EyeIcon } from '@heroicons/vue/solid'
  
  export default {
    components: {
      UserIcon,
      PlusIcon,
      EyeIcon
    }
  }
  </script>
  
  <style scoped>
  body {
    padding-top: 72px; /* Para evitar que el contenido quede debajo del nav fijo */
  }
  </style>
  