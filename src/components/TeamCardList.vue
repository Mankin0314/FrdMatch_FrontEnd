<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :thumb="rmImg"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数:  ${team.hasJoinNum}  / ${team.maxNum} ` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain @click="preJoinTeam(team)">加入队伍</van-button>

        <van-button v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button  size="small" plain
                    @click="doQuitTeam(team.id)"
                     v-if="team.userId !== currentUser?.id && team.hasJoin">退出队伍
        </van-button>
        <van-button  v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doDeleteTeam(team.id)" type="danger">解散队伍
        </van-button>
      </template>
    </van-card>
  </div>

  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showToast, Toast} from "vant";

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import rmImg from "../img/RM.webp";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const router = useRouter();

/**
 * 加入队伍
 */

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showToast('加入成功');
    doJoinCancel();
  } else {
    showToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

/**
 * 判断是不是加密房间，是的话显示密码框
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

//退出队伍

const doQuitTeam = async (id:number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,

  });
  if (res?.code === 0) {
    showToast('操作成功');
  } else {
    showToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}




//解散，删除队伍
const doDeleteTeam = async (id:number) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id,

  });
  if (res?.code === 0) {
    showToast('操作成功');
  } else {
    showToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}


/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

const currentUser = ref();

onMounted(async () =>{
  currentUser.value = await getCurrentUser();
})

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>