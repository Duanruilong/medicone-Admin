import {queryRequirement,updateRequirement,deleteRequirement} from '../services/requirement';
export default {
    namespace: 'requirement',
    state: {
        list: [],//设备列表
        total: null,//设备总数
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的设备对象
        inputDisabled:true,
        modalVisible:false,
        seachStr:'',
        status:''
    },
    effects: { 
        * query({ payload }, { select, call, put }) { 
            yield put({ type: 'showLoading' }); 
            const data = yield call(queryRequirement,{...payload}); 
            if (data&&data.errorCode==1) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data.list,
                        total: data.data.total,
                        current: data.data.pageNum
                    }
                });
            }else{
                yield put({
                    type: 'hideLoading',
                });
            }
        },
        * update({ payload }, { select, call, put }) {
            const data = yield call(updateRequirement,{...payload}); 
            if (data&&data.errorCode==1) {
               yield put({type: 'query' });
            }
        },
        * deleteRequirement({ payload }, { select, call, put }) {
            const data = yield call(deleteRequirement,{...payload}); 
            if (data&&data.errorCode==1) {
               yield put({type: 'query' });
            }
        },
        * review({ payload }, { select, call, put }) {
            let list=payload.list;
            let status;
            list.map((item)=>{
                if(item.id==payload.id){
                    if(item.status==0){
                        item.status=1;
                        status=1;
                    }else if(item.status==1){
                        item.status=0;
                        status=0;
                    }
                }
            })
            const data = yield call(updateRequirement,{id:payload.id,status:status}); 
            if (data&&data.errorCode==1) {
               yield put({type: 'query' });
            }
        },
    },
    reducers: {
        querySuccess(state, action){
            return {...state , ...action.payload ,loading: false};
        },
        changeCurrent(state, action) {
            return {...state, ...action.payload };
        },
        queryCategorySuccess(state, action){
            return {...state , ...action.payload };
        },
        showLoading(state, action) {
            return {...state, loading: true };
        }, 
        hideLoading(state, action) {
            return {...state, loading: false };
        }, 
        requirementSearchChange(state, action){
            return {...state, ...action.payload };
        },
        selectRequirementItem(state, action){
            let currentItem={};
            state.list.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                }
            })
            return {...state, currentItem : currentItem };
        },
        showModal(state, action){
            return {...state, modalVisible:true};
        },
        hideModal(state, action){
            return {...state, modalVisible:false};
        },
        itemChange(state, action){
            let currentItem = state.currentItem;
            let key = action.payload.key;
            currentItem[key] = action.payload.value;
            return {...state, currentItem: currentItem };
        },
        changeInputDisabled(state, action){
            return {...state, inputDisabled:!state.inputDisabled};
        }
    }
}
