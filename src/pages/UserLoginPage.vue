<script setup lang="ts">
import {useRouter} from "vue-router";
import { ref } from 'vue';
import myAxios from "../plugins/myAxios.ts";
import { showToast } from 'vant';

const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const result = await myAxios.post("/user/login",{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(result,'用户登录');
  if (result.code == 0 &&result.data) {
    showToast("登陆成功");
    router.replace('/');
  }else {
    showToast("登陆失败");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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