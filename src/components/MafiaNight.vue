<template>

  <div class="timer" v-if="!shootDone">
    Отстрел: {{timeCount}}
  </div>
  <div class="mafia-select" v-if="!shootDone">
    <div :class="[
        'user-select',
        {
          'select-animation': i === select,
        }
    ]"
         v-for="i in Object.keys(store.data).length"
         @click="kill(i)"
    >
      {{i}}
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.js";

const store = useUserStore();
const user = ref(store.data[store.user.sid]);

const timer = ref();
const timeCount = ref(30);
const shootDone = ref(false);


onMounted(() => {
  store.loaderDown();
  timer.value = setTimeout(() => {
    store.loaderUp();
    socket.emit('kill', 0);
  }, 30000);
  setInterval(()=>{
    timeCount.value--;
  }, 1000);
});

const select = ref(0);
const selectTimer = ref();
const kill = (place) => {
  if(select.value === 0) {
    select.value = place;
    selectTimer.value = setTimeout(()=>{
      clearTimeout(timer.value);
      shootDone.value = true;
      store.loaderUp();
      socket.emit('kill', place);
    }, 3000);
  } else {
    select.value = 0;
    clearTimeout(selectTimer.value);
  }
};

</script>

