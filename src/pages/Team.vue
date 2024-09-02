<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";



const router = useRouter();
const doCreateTeam = () =>{
  router.push({
    path:"/team/add",
  })
}

const searchText = ref('');

const teamList = ref([]);


const listTeam = async (val = '', status = 0) => {
  const res= await myAxios.get("/team/list",{
    params:{
     searchText: val,
      status,
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
const onTabChange = (name) =>{
  if (name ==='public'){
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }
}

const active = ref('public');

</script>

<template>

  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"/>
    <van-button type="primary" class="addBtn" icon="plus" @click="doCreateTeam"/>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="!teamList || teamList.length < 1" description="搜索结果为空" />
  </div>


</template>

<style scoped>

</style>