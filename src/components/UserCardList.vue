<script setup lang="ts">
import {UserType} from "../models/user";
import rmImg from '../img/RM.webp';
//import User from "../pages/UserUpdatePage.vue";

interface UserCardlistProps{
  userList: UserType[];
  loading: boolean;
}
const props = withDefaults(defineProps<UserCardlistProps>(),{
  //@ts-ignore
  loading: true,
  userList:[] as UserType[],
});

</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in userList">
  <van-card
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
  </van-skeleton>
</template>

<style scoped>

</style>