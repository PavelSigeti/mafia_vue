<template>
  <div class="user-item" v-for="(user, _, idx) in store.data">
    {{idx+1}}. {{user.username}}
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user.js";

const store = useUserStore();


</script>
