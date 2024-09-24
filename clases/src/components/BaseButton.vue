<script setup>
defineProps({
    color:{
        type: String,
        default: 'violet',
    }
})
</script>

<template>
    <button 
    class="transition-colors py-4 px-4 rounded text-white" 
    :class="` bg-blue-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`"
    type="submit">
    <slot />
</button>

</template>