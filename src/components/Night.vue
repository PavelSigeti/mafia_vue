<template>
  <MafiaNight  v-if="(user.role === 'Мафия' || user.role === 'Дон мафии') && store.status === 'night_start'" />
  <DonCheck v-if="user.role === 'Дон мафии' && store.status === 'killed_player'" />
  <SheriffNight v-if="user.role === 'Шериф' && store.status === 'sheriff'" />
  <Loader v-if="store.loader" />
</template>

<script setup>
import {useUserStore} from "../stores/user.js";
import {onMounted, ref} from "vue";
import Loader from '../ui/loader.vue';
import MafiaNight from '../components/MafiaNight.vue';
import DonCheck from './DonCheck.vue';
import SheriffNight from './SheriffNight.vue';

const store = useUserStore();
const user = ref(store.data[store.user.sid]);

</script>
