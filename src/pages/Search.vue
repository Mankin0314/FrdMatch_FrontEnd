<script setup lang="ts">
import { ref } from 'vue';
import {showToast} from "vant";
import {useRouter} from "vue-router";

const value = ref('');
const router = useRouter();
const searchText = ref('');


const originTagList =[
  {
    text: '性别',
    children: [
      { text: '男', id: '男'},
      { text: '女', id: '女' },],
  },
  {
    text: '年纪',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大4', id: '大4' },
      { text: '大5', id: '大5' },
      { text: '大6', id: '大6' },
      { text: '大7', id: '大7' },
      { text: '大8', id: '大8' },
      { text: '大9', id: '大9' },
    ],
  },
]

let tagList =ref(originTagList);

const onSearch = () => {
  console.log(tagList);
  console.log(tagList.value);

  tagList.value = originTagList.map(parentTag => {
    const tempChildren =[...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;

  });
}




    const onCancel = () => {
      searchText.value = '';
      tagList.value=originTagList;
    }

    const doClose = (tag) => {
      activeIds.value = activeIds.value.filter(item =>{
        return item !== tag
      })
    }

    const doSearch = () => {
      router.push({
        path:'/search/list',
        query:{
          tags:activeIds.value
        }
      })
    }

const activeIds = ref([]);
const activeIndex = ref(0);


</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入关键字"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>


  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length ===0"> 请选择标签</div>
  <van-row gutter="16" style="padding: 16px">
    <van-col v-for="tag in activeIds">
      <van-tag  show="true" closeable size="small" type="primary" @close="doClose(tag)">
      {{tag}}
    </van-tag>
    </van-col>
  </van-row>


  <van-divider content-position="left">可选标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

<div style="padding: 12px">
  <van-button type="primary" @click="doSearch" block >搜索</van-button>
</div>

</template>

<style scoped>

</style>