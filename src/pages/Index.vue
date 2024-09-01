<template>

  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="25" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />



</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import axiosInstance from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import rmImg from '../img/RM.webp';
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {UserType} from "../models/user";
const router = useRouter()
const route =useRoute()

const userList = ref([])
const isMatchMode = ref<boolean>(false);
const loading = ref<boolean>(true);
/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 6;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showToast('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value=false;
}


watchEffect(() => {
  loadData();
})


const fakeUser ={
  id: 1,
  username: 'Mankin',
  userAccount: "MinjianNB",
  profile: "一个帅哥,目前还有头发",
  avatarUrl: "/src/img/RM.webp",
  gender: "male",
  phoneNumber: "13660529511",
  email: "email",
  planetCode: "1234",
  tags: ["java","python","男"],
  createTime: new Date(),
}


</script>


<style scoped>

</style>