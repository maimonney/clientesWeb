<script setup>
import { RouterLink } from 'vue-router';
import BaseHeading1 from '../components/BaseHeading1.vue';
import Baseh2 from '../components/Baseh2.vue';
import ButtonBase from '../components/ButtonBase.vue';
import Cards from '../components/Cards.vue';
import ToBack from '../components/ToBack.vue';
</script>

<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <ToBack />
        
        <section class="text-center">
            <BaseHeading1>Vivi viajando</BaseHeading1>
            <p class="mt-4 text-gray-700 text-lg">
                ¡Conoce lugares inolvidables y comparte tus experiencias de viaje con una comunidad apasionada por
                descubrir el mundo!
            </p>
        </section>

        <section class="mt-8">
            <Baseh2>
                Destinos Destacados
            </Baseh2>
            <Cards></Cards>
        </section>

        <section class="mt-12 text-center">
            <Baseh2>
                Únete a la Comunidad
            </Baseh2>
            <p class="text-gray-700">
                Comparte tus aventuras, descubre nuevos lugares a través de los ojos de otros viajeros, y planifica tu
                próximo destino.
            </p>
            <div class="mt-8 flex justify-center">
             <RouterLink to="/publicaciones" > 
             <ButtonBase  class="w-64">Comparte tu experiencias</ButtonBase>
             </RouterLink> 
            </div>
        </section>
    </div>
</template>