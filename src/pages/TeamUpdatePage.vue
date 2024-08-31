<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showToast, Toast} from "vant";
import {onMounted, ref} from "vue";
import moment from "moment";

const router = useRouter();


const initFormData = {
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 0,
  "userId": 0
}
const value = ref(1);

const result = ref('');

const showPicker = ref(false);

const route = useRoute();
const queryId=route.query.id;

const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};

//用户填写的表单数据
const addTeamData = ref({})


//获取之前的队伍信息
onMounted( async () => {
if (queryId <= 0){
  showToast("加载队伍失败");
  return
}

  const res= await myAxios.get("/team/get",{
    params:{
      id: queryId
    }
  });
  if(res?.code == 0){
    addTeamData.value = res.data;
  }else{
    showToast("加载队伍失败，请稍后重试");
  }
})

// 当前时间
const minDate = new Date();

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    expireTime: moment(addTeamData.value.expireTime).format("YYYY-MM-DD HH:mm:ss")
  }
  //todo 前端参数校验
  const result = await myAxios.post("/team/update",postData)
  if (result.code == 0 && result.data) {
    showToast("更新成功");
    router.push({
      path:'/team',
      replace:true,
    })
  }else{
    showToast("更新失败")
  }
};


</script>

<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入队伍名' }]"
      />

      <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />
      <!--过期时间-->
      <van-field
          is-link
          readonly
          name="datePicker"
          label="时间选择"
          :placeholder="addTeamData.expireTime ?? '点击选择关闭队伍加入的时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            @confirm="onConfirm"
            @cancel="showPicker = false"
            type="datetime"
            title="请选择关闭队伍加入的时间"
            :min-date="minDate"/>
      </van-popup>


      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="Number(addTeamData.status)===2 "
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写队伍密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>