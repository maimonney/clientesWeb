<script setup>
import { ref } from 'vue';

const destinos = ref([
  {
    nombre: 'Bariloche',
    descripcion: 'San Carlos de Bariloche, famosa por sus montañas y lagos, es el destino ideal para los amantes del esquí y el senderismo.',
    img: '/img/bariloche.jpg',
    alt: 'Bariloche',
  },
  {
    nombre: 'Coyoacán',
    descripcion: 'El barrio de Coyoacán en Ciudad de México destaca por sus museos, arte y calles coloniales llenas de historia.',
    img: '/img/Coyoacan.jpg',
    alt: 'Coyoacán',
  },
  {
    nombre: 'Río de Janeiro',
    descripcion: 'Río es famosa por sus playas como Copacabana y la icónica estatua del Cristo Redentor, con vistas panorámicas de la ciudad.',
    img: '/img/rio.jpg',
    alt: 'Río de Janeiro',
  },
  {
    nombre: 'París',
    descripcion: 'La ciudad de la luz, hogar de la Torre Eiffel, el Louvre y muchos otros lugares icónicos.',
    img: '/img/paris.jpg',
    alt: 'París',
  },
  {
    nombre: 'Kioto',
    descripcion: 'Kioto, Japón, es famoso por sus templos antiguos, jardines tranquilos y tradiciones culturales centenarias.',
    img: '/img/kioto.jpg',
    alt: 'Kioto',
  },
  {
    nombre: 'Nueva York',
    descripcion: 'La Gran Manzana, con su impresionante horizonte y atracciones como Central Park y la Estatua de la Libertad.',
    img: '/img/ny.jpg',
    alt: 'Nueva York',
  },
]);
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <div v-for="destino in destinos" :key="destino.nombre" class="flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition w-full">
      <img class="w-full h-32 rounded-t-xl object-cover" :src="destino.img" :alt="destino.alt">
      <div class="p-3 md:p-4">
        <h3 class="text-lg font-bold text-black">{{ destino.nombre }}</h3>
        <p class="mt-1 text-gray-700">{{ destino.descripcion }}</p>
      </div>
    </div>
  </div>
</template>
