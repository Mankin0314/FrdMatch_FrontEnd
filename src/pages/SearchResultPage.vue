<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />



</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axiosInstance from "../plugins/myAxios.ts";
import QueryString from "qs";
import {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";
const router = useRouter()
const route =useRoute()
const {tags} = route.query

const userList = ref([])


onMounted( async () =>{
  // 为给定 ID 的 user 创建请求
  const userListData = await  axiosInstance.get('/user/search/tags',{
    withCredentials: false,
    params: {
      tagNameList: tags
    },
    //用鱼皮的这个我的头像不会显示。
    // paramsSerializer: params =>{
    //   return qs.stringify(params,{indices: false})
    // }

    //序列化
    paramsSerializer: {
      serialize: params => QueryString.stringify(params, { indices: false}),
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed',response);

        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error',error);

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