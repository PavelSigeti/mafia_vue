<template>

</template>

<script setup>
import {useUserStore} from "../stores/user.js";
import {useRouter} from 'vue-router';
import {onMounted} from "vue";


const store = useUserStore();
const router = useRouter();

onMounted(()=>{
  store.restart();
  router.push('/');
});



</script>
