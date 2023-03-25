<template>
  <div class="timer" v-if="!donCheck">
    Дон: {{timeCount}}
  </div>
  <div class="don-check" v-if="result !== null">
    Игрок №{{select}} - {{result}}
  </div>
  <div class="mafia-select" v-if="!donCheck">
    <div :class="[
        'user-select',
        {
          'select-animation': i === select,
        }
    ]"
         v-for="i in Object.keys(store.data).length"
         @click="check(i)"
    >
      {{i}}
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user.js";
import {onMounted, ref} from "vue";

const store = useUserStore();
const user = ref(store.data[store.user.sid]);

const select = ref(0);

const timer = ref();
const timeCount = ref(20);
const interval = ref();


onMounted(() => {
  store.loaderDown();
  timer.value = setTimeout(() => {
    donCheck.value = true;
    store.loaderUp();
    socket.emit('start', 'don');
  }, 23100);
  interval.value = setInterval(()=>{
    timeCount.value--;
  }, 1000);
});

const donCheck = ref(false);

const result = ref(null);
const selectTimer = ref();
const socketTimer = ref();

const check = (param) => {
  if(select.value === 0) {
    select.value = param;
    for(let item in store.data) {
      if(store.data[item].number === param) {
        selectTimer.value = setTimeout(()=>{
          clearTimeout(timer.value);
          clearInterval(interval.value);
          donCheck.value = true;
          store.loaderUp();
          result.value = store.data[item].role;
        }, 3000);
        socketTimer.value = setTimeout(()=>{socket.emit('start', 'don')}, 8000);
        break;
      }
    }
  } else {
    select.value = 0;
    clearTimeout(selectTimer.value);
    clearTimeout(socketTimer.value);
  }

};

</script>

