import { login, loginOut ,geteSys,updateSys} from '../services/login';
import { hashHistory } from 'dva/router'
const menu = [{
    subMenu: '首页内容管理',
    iconType: 'desktop',
    menu: [{
        item: '展示图片管理',
        key: 'banner',
    },{
        item: '热门管理',
        key: 'hot',
    },{
        item: '需求列表',
        key: 'requirement',
    },{
        item: '合作伙伴',
        key: 'partner',
    }]
}, {
    subMenu: '产品管理',
    iconType: 'hdd',
    menu: [{
        item: '分类管理',
        key: 'category',
    }, {
        item: '产品列表',
        key: 'product',
    }]
}, {
    subMenu: '合作伙伴管理',
    iconType: 'laptop',
    menu: [{
        item: '合作伙伴列表',
        key: 'provider',
    }]
}, {
    subMenu: '用户管理',
    iconType: 'user',
    menu: [{
        item: '用户列表',
        key: 'user',
    }]
},{
    subMenu: '系统管理',
    iconType: 'setting',
    menu: [{
        item: '咨询信息配置',
        key: 'tag',
    }]
}];
export default {
    namespace: 'login',
    state: {
        user: {},
        menu: menu,
        showMessage: false,
        sysTel:'',
        sysEmail:'',
        sysEditMessage:false
    },
    effects: { * login({ payload }, { select, call, put }) {
            const data = yield call(login, {...payload });
            if (data) {
                if (data.errorCode == 1) {
                    localStorage.loginStatus = 1;
                    yield put({
                        type: 'loginChange',
                    });
                    hashHistory.push({ pathname: '/' })
                } else {
                    yield put({
                        type: 'showMessage',
                    });
                }
            }
        },
        * loginOut({ payload }, { select, call, put }) {
            const data = yield call(loginOut);
            if (data) {
                if (data.errorCode == 1) {
                    localStorage.loginStatus = 0;
                    hashHistory.push({ pathname: '/login' })
                }
            }
        },
        * getSys({ payload }, { select, call, put }) {
            const data = yield call(geteSys,{id:1});
            if (data) {
                if (data.errorCode == 1) {
                    yield put({
                        type: 'change',
                        payload:{
                            sysTel:data.data.tel,
                            sysEmail:data.data.email
                        }
                    });
                }
            }
        },
        * updateSys({ payload }, { select, call, put }) {
            const data = yield call(updateSys,{...payload});
            if (data) {
                if (data.errorCode == 1) {
                    yield put({
                        type: 'change',
                        payload:{
                            sysTel:payload.tel,
                            sysEmail:payload.email,
                            sysEditMessage:true
                        }
                    });
                }
            }
        },
    },
    reducers: {
        change(state, action) {
            return {...state, ...action.payload };
        },
        showMessage(state, action) {
            return {...state, showMessage: true };
        },
        userChange(state, action) {
            let user = state.user;
            let key = action.payload.key;
            user[key] = action.payload.value;
            return {...state, user: user };
        },

    }
}
