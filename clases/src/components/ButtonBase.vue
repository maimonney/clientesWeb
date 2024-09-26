<script setup>
defineProps({
    color:{
        type: String,
        default: 'violet',
    }
})
</script>

<template>
  <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 "> <slot/></button>
       
      </div>
    

</template>