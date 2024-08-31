import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserState} from "../state/user.ts";
//import {getCurrentUserState, setCurrentUserState} from "../state/user.ts";


export const getCurrentUser = async () => {

    //return await myAxios.get('/user/current');
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    //不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code == 0){
        setCurrentUserState(res.data)
        return res.data;
    }
    return null;
}
