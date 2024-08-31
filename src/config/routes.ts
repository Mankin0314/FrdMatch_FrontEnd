import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";



const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/team/add', component: TeamAddPage },
    { path: '/team/update', component: TeamUpdatePage },
    { path: '/user', component: UserPage },
    { path: '/search',component: Search },
    { path: '/user/edit/',component: UserEdit },
    { path: '/search/result', component: SearchResultPage },
    { path: '/user/login', component: UserLoginPage },
    { path: '/user/update', component: UserUpdatePage },
    { path: '/user/team/join', component: UserTeamJoinPage },
    { path: '/user/team/create', component: UserTeamCreatePage },





]

export default routes;