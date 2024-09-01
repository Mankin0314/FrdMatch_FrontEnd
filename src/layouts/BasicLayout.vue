<script setup lang="ts">
import {showToast} from "vant";
import { ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
import routes from "../config/routes.ts";
const router = useRouter();

const onClickLeft = () =>{
  router.back()
};
const onClickRight = () => {
   router.push("/search")
};
const active = ref("index");
const route = useRoute();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref('DEFAULT_TITLE');

//根据路由切换标题
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) =>{
   return  toPath == route.path;
  })
  if (!route?.title){
    title.value =  DEFAULT_TITLE;
  }else {
    title.value = route.title;
  }
})
</script>

<template>
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>

  </van-nav-bar>


  <div id="content" style="padding-bottom: 50px">
  <router-view />
  </div>

  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item to="/"  icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">用户</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

</style>