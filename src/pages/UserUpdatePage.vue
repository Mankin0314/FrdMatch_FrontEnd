<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import myAxios from "../plugins/myAxios.ts";
//import {showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
// import {onMounted} from "vue";
// import QueryString from "qs";
// import axiosInstance from "../plugins/myAxios.ts";


const fakeUser = {
  id: 1,
  username: 'Mankin',
  userAccount: "MinjianNB",
  avatarUrl: "https://baidu.com",
  gender: "male",
  phoneNumber: "13660529511",
  email: "email",
  planetCode: "1234",
  tags: ["java","python"],
  createTime: new Date(),
};


const user =ref();

onMounted(async ()=>{
  user.value= await getCurrentUser();
})





const router =useRouter({});

const toEdit =(editKey: string,editName: string, currentValue: string)=>{
  router.push({
    path:"/user/edit",
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}


//
// onMounted( async () =>{
//   // 为给定 ID 的 user 创建请求
//   const userListData = await  axiosInstance.get('/user/search/tags',{
//     withCredentials: false,
//     params: {
//       tagNameList: tags
//     },
//     //用鱼皮的这个我的头像不会显示。
//     // paramsSerializer: params =>{
//     //   return qs.stringify(params,{indices: false})
//     // }
//
//     //序列化
//     paramsSerializer: {
//       serialize: params => QueryString.stringify(params, { indices: false}),
//     }
//   })
//       .then(function (response) {
//         console.log('/user/search/tags succeed',response);
//
//         return response.data?.data;
//       })
//       .catch(function (error) {
//         console.log('/user/search/tags error',error);
//
//       });
//   if (userListData) {
//     userListData.forEach(user => {
//       if (user.tags) {
//         user.tags = JSON.parse(user.tags);
//       }
//     })
//     userList.value = userListData;
//     console.log(userList.value);
//   }
// })


</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','昵称' ,user.username)"/>
    <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('userAccount','账号' ,user.userAccount)"/>
    <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender','性别' ,user.gender)"/>
    <van-cell title="头像" is-link  to="/user/edit">
      <img src="/src/img/RM.webp" style="height: 48px">
    </van-cell>
    <van-cell title="电话" is-link  :value="user.phone"  @click="toEdit('phone','电话' ,user.phone)"/>
    <van-cell title="邮箱" is-link  :value="user.email" @click="toEdit('email','邮箱' ,user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="user.createTime" />
  </template>



</template>

<style scoped>

</style>