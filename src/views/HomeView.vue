<template>
  <header>
    Mafia
  </header>
  <main>
    <Welcome @start="join" v-if="store.user === null"/>
    <UserList v-if="store.status === 'wait'"/>
    <UserPlace v-if="store.status === 'game'"/>
    <Loader v-if="loader"/>
    <Night v-if="store.status === 'night'
        || store.status === 'killed_player'
        || store.status === 'don'
        || store.status === 'sheriff'
    "/>
    <div class="night-result" v-if="store.status === 'morning'">
      <span>{{store.killed}}</span>
      <img src="../assets/img/blood.svg" alt="blood">
    </div>
    <div class="admin-buttons" v-if="
        store.user !== null
        && store.status !== 'night'
        && store.status !== 'killed_player'
        && store.status !== 'don'
        && store.status !== 'sheriff'
        && store.user.admin === 'true'
    ">
      <button @click="start" v-if="store.status === 'wait'">Начать игру</button>
      <button @click="night" v-if="store.status === 'game'">Запустить ночь</button>
      <button @click="restart" >Перезапустить</button>
    </div>
  </main>
</template>

<script setup>
import {ref} from "vue";
import {io} from "socket.io-client";
import Welcome from '../components/welcome.vue';
import UserList from '../components/UserList.vue';
import UserPlace from '../components/UserPlace.vue';
import Loader from '../ui/loader.vue';
import {useUserStore} from "../stores/user.js";
import Night from '../components/Night.vue';

const store = useUserStore();
const username = ref('');

const loader = ref(false);

socket.on("chat_message", (socket) => {
  console.log('socket', socket);
  switch (socket.type) {
    case 'player_list':
      store.setData(socket.data);
      break;
    case 'user_data':
      store.userInit({...socket, ...{name: username.value}});
      loader.value = false;
      break;
    case 'joined_list':
      store.setData(socket.data);
      break;
    case 'users_data':
      store.startGame(socket.data);
      break;

    case 'night_start':
      store.changeStatus('night');
      break;

    case 'killed_player':
      store.setKill(socket.place);
      store.changeStatus('killed_player');
      if(store.user.admin === 'true') {
        const audio = new Audio('http://mafia.warpion.ru/after_kill.mp3');
        audio.play();
      }
      break;

    case 'don':
      store.changeStatus('don');
      if(store.user.admin === 'true') {
        const audio = new Audio('http://mafia.warpion.ru/don.mp3');
        audio.play();
      }
        setTimeout(()=>{
          if(store.user.admin === 'true') {
            const audio = new Audio('http://mafia.warpion.ru/before_sheriff.mp3');
            audio.play();
          }
          store.changeStatus('sheriff');
        }, 10000);
      break;

    case 'morning':
      if(store.user.admin === 'true') {
        const audio = new Audio('http://mafia.warpion.ru/after_sheriff.mp3');
        audio.play();
      }
      setTimeout(()=>{
        if(store.user.admin === 'true') {
          const audio = new Audio('http://mafia.warpion.ru/morning.mp3');
          audio.play();
        }
        store.changeStatus('morning');
      }, 10000);
      break;

    case 'restart':
      store.restart();
      break;

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
  }, 10000);
};

const restart = () => {
  socket.emit('start', 'restart');
  store.restart();
};
</script>
