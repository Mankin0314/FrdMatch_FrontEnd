<script setup lang="ts">
import {UserType} from "../models/user";
import rmImg from '../img/RM.webp';
//import User from "../pages/UserUpdatePage.vue";

interface UserCardlistProps{
  userList: UserType[];
}
const props = withDefaults(defineProps<UserCardlistProps>(),{
  //@ts-ignore
  userList:[] as UserType[],
});

</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (${user.planetCode})`"
      :thumb="rmImg"
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 5px;margin-top: 5px">{{tag}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>