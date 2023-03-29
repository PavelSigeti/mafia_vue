<template>
  <header>
    <button class="api-btn" @click="forceApi">API</button>
    Mafia
  </header>
  <main>
    <Welcome @start="join" v-if="store.status === 'wait' && store.user === null"/>
    <UserList v-if="store.status === 'wait'"/>
    <UserPlace v-if="store.status === 'user_data'"/>
    <Loader v-if="loader"/>
    <Night v-if="store.status === 'night_start'
        || store.status === 'killed_player'
        || store.status === 'don'
        || store.status === 'sheriff'
    "/>
    <div class="night-result" v-if="store.status === 'morning'">
      <span>{{store.killed}}</span>
      <img src="../assets/img/blood.svg" alt="blood">
    </div>
    <div class="reset-btn-wrapper">
      <button v-if="store.status === 'morning'" @click="store.restart();">Отчистить данные</button>
    </div>
    <div class="admin-buttons" v-if="
        store.user !== null
        && store.user.admin === 'true'
    ">
      <button @click="start" v-if="store.status === 'wait'">Начать игру</button>
      <button @click="night" v-if="store.status === 'user_data'">Запустить ночь</button>
      <button @click="restart">Перезапустить</button>
    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {io} from "socket.io-client";
import Welcome from '../components/welcome.vue';
import UserList from '../components/UserList.vue';
import UserPlace from '../components/UserPlace.vue';
import Loader from '../ui/loader.vue';
import {useUserStore} from "../stores/user.js";
import Night from '../components/Night.vue';
import {socketHandler} from "../utils/socket_handler";

const store = useUserStore();
const username = ref('');

const forceApi = async () => {
  try {
    const response = await fetch('http://localhost:8000/current');
    const data = await response.json()
    socketHandler(store, data);
  } catch(e) {
    console.log(e.message);
  }
};

const loader = ref(false);

socket.on("chat_message", (socket) => {
  console.log('socket', socket);
  socketHandler(store, socket);

  if(socket.type === 'user_data') {
    loader.value = false;
  }

});

const join = (param) => {
  loader.value = true;
  username.value = param;
  socket.emit("message", {username: username.value});
}

const start = () => {
  socket.emit('start', 'start');
  const audio = new Audio('http://mafia.warpion.ru/greeting.mp3');
  audio.play();
};


const night = () => {
  const audio = new Audio('http://mafia.warpion.ru/start.mp3');
  audio.play();
  setTimeout(()=>{
    const audio = new Audio('http://mafia.warpion.ru/before_kill.mp3');
    audio.play();
    socket.emit('start', 'night');
  }, 6000);
};

const restart = () => {
  socket.emit('start', 'restart');
  store.restart();
};
</script>
