<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";




const router = useRouter();
const doJoinTeam = () =>{
  router.push({
    path:"/team/add",
  })
}

const searchText = ref('');

const teamList = ref([]);


const listTeam = async (val = '') => {
  const res= await myAxios.get("/team/list",{
    params:{
     searchText: val,
    }
  });
  if(res?.code == 0){
    teamList.value = res.data;
  }else{
    showToast("加载队伍失败，请稍后重试");
  }
};

onMounted( ()=>{
  listTeam();
})

const onSearch = (val) =>{
  listTeam(val);
}



</script>

<template>

  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" description="搜索结果为空" />
  </div>

</template>

<style scoped>

</style>