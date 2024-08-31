<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />



</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axiosInstance from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import rmImg from '../img/RM.webp';
const router = useRouter()
const route =useRoute()

const userList = ref([])


onMounted( async () =>{
  // 为给定 ID 的 user 创建请求
  const userListData = await  axiosInstance.get('/user/recommend',{
    withCredentials: true,
    params: {
      pageSize:8,
      pageNum:1,
    },

  })
      .then(function (response) {
        console.log('/user/recommend succeed',response);

        return response?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);

      });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    console.log(userList.value);
  }
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