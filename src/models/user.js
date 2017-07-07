import { queryUser, updateUser,queryUserRecord ,insertUserRecord} from '../services/user';
import { hashHistory } from 'dva/router';
export default {
    namespace: 'user',
    state: {
        list: [],
        total: null,
        loading: false,
        current: null,
        recordList: [],
        recordTotal: null,
        recordLoading: false,
        recordCurrent: null,
        currentItem: {},
        recordModalVisible:false,
        recordContent:null,
        searchStr:''
    },
    effects: { * query({ payload }, { select, call, put }) {
            yield put({ type: 'showLoading' });
            const data = yield call(queryUser, {...payload });
            if (data && data.errorCode == 1) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.list,
                        total: data.data.total,
                        current: data.data.pageNum
                    }
                });
            }
            yield put({ type: 'hideLoading' });
        },
        * queryRecord({ payload }, { select, call, put }) {
            yield put({ type: 'showRecordLoading' });
            const data = yield call(queryUserRecord, {...payload});
            if (data && data.errorCode == 1) {
                yield put({
                    type: 'queryRecordSuccess',
                    payload: {
                        recordList: data.data.list,
                        recordTotal: data.data.total,
                        recordCurrent: data.data.pageNum
                    }
                });
            }
            yield put({ type: 'hideRecordLoading' });
        },
        * updateUserIsUse({ payload }, { select, call, put }) {
            let status = '';
            let list = payload.list;
            list.map((item) => {
                if (item.id == payload.id) {
                    if (item.status == 1) {
                        status = 0;
                        item.status = 0;
                    } else {
                        status = 1;
                        item.status = 1;
                    }
                }
            })
            let isUseUser = { id: payload.id, status: status };
            const data = yield call(updateUser, {...isUseUser });
            yield put({ type: 'updateUserIsUseSuccess', payload: { list: list } });
        },
        * insertUserRecord({ payload }, { select, call, put }) {
            const data = yield call(insertUserRecord, {...payload });
            yield put({ type: 'hideRecordModal' });
            yield put({ type: 'queryRecord' });
        },
        
    },
    reducers: {
        querySuccess(state, action) {
            return {...state, ...action.payload, loading: false };
        },
        searchStrChange(state, action){
            return {...state, ...action.payload };
        },
        changeCurrent(state, action) {
            return {...state, ...action.payload };
        },
        updateUserIsUseSuccess(state, action){
            return {...state, ...action.payload };
        },
        showLoading(state, action) {
            return {...state, loading: true };
        },
        hideLoading(state, action) {
            return {...state, loading: false };
        },
        queryRecordSuccess(state, action) {
            return {...state, ...action.payload, recordLoading: false };
        },
        showRecordLoading(state, action) {
            return {...state, recordLoading: true };
        },
        hideRecordLoading(state, action) {
            return {...state, recordLoading: false };
        },
        showRecordModal(state, action) {
            return {...state, recordModalVisible: true };
        },
        hideRecordModal(state, action) {
            return {...state, recordModalVisible: false };
        },
        recordContentChange(state, action) {
            return {...state, ...action.payload };
        },
        changeRecordCurrent(state, action) {
            return {...state, ...action.payload };
        },
        selectUserItem(state, action) {
            let currentItem = {};
            state.list.map((item) => {
                if (item.id == action.payload.id) {
                    currentItem = item;
                }
            })
            return {...state, currentItem: currentItem };
        }
    }
}
