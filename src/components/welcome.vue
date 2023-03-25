<template>
  <div class="welcome">
    <input type="text" v-model="name" placeholder="Ваше имя" @keyup.enter="start">
    <button @click="start">Начать</button>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user.js";
import {ref} from "vue";

const emit = defineEmits(['start'])

const name = ref('');
const start = () => {
  emit('start', name.value);
}

</script>
