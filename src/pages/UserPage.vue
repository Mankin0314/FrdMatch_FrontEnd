<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
//import myAxios from "../plugins/myAxios.ts";
//import {showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
// import {onMounted} from "vue";
// import QueryString from "qs";
// import axiosInstance from "../plugins/myAxios.ts";


// const fakeUser = {
//   id: 1,
//   username: 'Mankin',
//   userAccount: "MinjianNB",
//   avatarUrl: "https://baidu.com",
//   gender: "male",
//   phoneNumber: "13660529511",
//   email: "email",
//   planetCode: "1234",
//   tags: ["java","python"],
//   createTime: new Date(),
// };
//

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
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>



</template>

<style scoped>

</style>