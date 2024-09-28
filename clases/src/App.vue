<script setup>
import NavSuperior from './components/NavSuperior.vue';
</script>

<!-- src/App.vue -->
<template>
  <NavSuperior></NavSuperior>
 
    <main class="p-4">
      <router-view /> <!-- Aquí se cargará el contenido de las rutas -->
    </main> 
 
    <footer class="flex justify-center items-center h-[6.25rem] bg-slate-800 text-white">
      <p>Copyright &copy; Da Vinci 2024</p>
    </footer>
  </template>
  
