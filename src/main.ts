import { createApp } from 'vue'
import App from './App.vue'
import {Button, Icon, NavBar, Tabbar, TabbarItem} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/routes.ts";
import { Divider } from 'vant';
import { Search } from 'vant';
import { Cascader } from 'vant';
import { Empty } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Form, Field } from 'vant';
import { Toast } from 'vant';
import { Card } from 'vant';
import {
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph,
} from 'vant';
import '../global.css'




const app = createApp(App)
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Divider);
app.use(Search);
app.use(Cascader);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Card);
app.use(Empty);
app.use(Toast);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);



const router = VueRouter.createRouter({
    history:VueRouter.createWebHistory(),
    routes,
})


app.use(router);

app.mount('#app')





