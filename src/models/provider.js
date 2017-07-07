import {queryProvider, updateProvider, insertProvider  } from '../services/provider';
import { hashHistory} from 'dva/router';
export default {
    namespace: 'provider',
    state: {
        list: [],//设备列表
        total: null,//设备总数
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的设备对象
        editProviderTitle:'',
        fileList: [],
        previewVisible: false,
        previewImage: '',
        uploadUrl:'/medicone/admin/provider/uploadProviderIcon',
    },
    effects: { 
        * initProvider({ payload }, { select, call, put }) { 
            yield put({ type: 'clearfileList' }); 
            const data = yield call(insertProvider,{status:-1}); 
            if (data&&data.errorCode==1) {
                let currentItem={id:data.data};
                yield put({
                    type: 'initProviderSuccess',
                    payload: {
                        currentItem: currentItem
                    }
                });
                yield put({ type: 'changeEditProviderTitle',payload:{editProviderTitle:'添加合作伙伴'} }); 
                hashHistory.push({pathname:'/provider/edit'});
            }
        },
        * query({ payload }, { select, call, put }) { 
            yield put({ type: 'showLoading' }); 
            const data = yield call(queryProvider,{...payload}); 
            if (data&&data.errorCode==1) {
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
        * updateProvider({ payload }, { select, call, put }) {
            if(payload.currentItem&&payload.currentItem.status==1){
                const data = yield call(updateProvider,{...payload.currentItem}); 
                if (data&&data.errorCode==1) {
                    hashHistory.push({pathname:'/provider'});
                }
            }else{
               let currentItem={
                   id:payload.id,
                   iconUrl:' '
               }
               yield call(updateProvider,{...currentItem});
            }
        },
        * deleteProvider({ payload }, { select, call, put }) {
                const data = yield call(updateProvider,{...payload}); 
                if (data&&data.errorCode==1) {
                    yield put({type: 'query'});
                }
        },
        * updateProviderIsShow({ payload }, { select, call, put }) {
            let isShow='';
            let list=payload.list;
            list.map((item)=>{
                if(item.id==payload.id){
                    if(item.isShow==1){
                        isShow=0;
                        item.isShow=0;
                    }else{
                        isShow=1;
                        item.isShow=1;
                    }
                }
            })
            let isShowProvider={id:payload.id,isShow:isShow};
            const data = yield call(updateProvider,{...isShowProvider}); 
            yield put({type: 'updateProviderIsShowSuccess',payload:{list:list}});
        },
        * insertProvider({ payload }, { select, call, put }) {
            const data = yield call(insertProvider,{...payload}); 
        },
        * chooseProvider({ payload }, { select, call, put }) {
            if(payload.id){
                   yield put({type: 'chooseProviderSuccess',payload:{id:payload.id}});
                   yield put({ type: 'changeEditProviderTitle',payload:{editProviderTitle:'编辑合作伙伴'} });
                   hashHistory.push({pathname:'/provider/edit'});
            }
        },
    },
    reducers: {
        initProviderSuccess(state, action){
            return {...state , ...action.payload };
        },
        querySuccess(state, action){
            return {...state , ...action.payload ,loading: false};
        },
        changeCurrent(state, action) {
            return {...state, ...action.payload };
        },
        updateProviderIsShowSuccess(state, action){
            return {...state , ...action.payload };
        },
        showLoading(state, action) {
            return {...state, loading: true };
        },
        hideLoading(state, action) {
            return {...state, loading: false };
        },
        fileListChange(state, action) {
            if(action.payload.fileList.length==1){
                 action.payload.fileList[0].name=state.currentItem.id;
            }
            return {...state,...action.payload };
        },
        showPreview(state, action){
            return {...state,...action.payload };
        },
        hidePreview(state, action){
            return {...state,previewVisible: false};
        },
        providerItemChange(state, action){
            let currentItem = state.currentItem;
            let key = action.payload.key;
            currentItem[key] = action.payload.value;
            return {...state, currentItem: currentItem };
        },
        clearfileList(state, action){
            return {...state, fileList: [] };
        },
        clearItemIconUrl(state, action){
            let currentItem=state.currentItem;
            currentItem.iconUrl=' ';
            return {...state, currentItem: currentItem };
        },
        chooseProviderSuccess(state, action){
            let currentItem={};
            let fileList=[];
            state.list.map((item,i)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                    if(item.iconUrl&&item.iconUrl!=' '){
                        let file={ 
                        uid: -i,      
                        name: item.id,
                        thumbUrl:item.iconUrl,
                        status: 'done', 
                     };
                     fileList.push(file);
                    }
                }
            })
            return {...state, currentItem: currentItem ,fileList:fileList};
        },
        changeEditProviderTitle(state, action){
            return {...state, ...action.payload};
        }
    }
}
