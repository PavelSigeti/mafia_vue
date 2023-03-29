<template>
  <div class="user-info">
    <div :class="['user-info__container', {'user-info__blur': !showRole}]" @click="toggleRole">
      <div class="user-place">Место: {{user.number}}</div>
      <div class="user-role">{{user.role}}</div>
    </div>
    <div class="user-blur" v-if="!showRole" @click="toggleRole">
      <div :class="['user-info__container','user-info__blur']">
        <div class="user-place">Место: {{user.number}}</div>
        <div class="user-role">Мирный житель</div>
      </div>
      Показать
    </div>
    <div class="img-wrapper" v-if="showImg" @click="toggleRole">
      <img src="../assets/img/sheriff.svg" alt="sheriff" v-if="user.role==='Шериф'">
      <img src="../assets/img/don.svg" alt="sheriff" v-if="user.role==='Дон мафии'">
      <img src="../assets/img/maf.svg" alt="sheriff" v-if="user.role==='Мафия'">
      <img src="../assets/img/mir.svg" alt="sheriff" v-if="user.role==='Мирный житель'">
    </div>

    <div class="user-table">
      <div class="user-item" v-for="(user) in store.data">
        {{user.number}}. {{user.username}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/user.js";
import {onMounted, ref} from "vue";

const store = useUserStore();
const user = store.data[store.user.sid];

const showImg = ref(true);
const showRole = ref(true);

const toggleRole = () => {
  showRole.value = !showRole.value;
  showImg.value = false;
};

onMounted(() => {
  setTimeout(()=>{
    showImg.value = false;
    showRole.value = false;
  }, 15000);
})
</script>
