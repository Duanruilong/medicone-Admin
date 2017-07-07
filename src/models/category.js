import { queryCategory ,insertCategory,queryById,updateById,getHotList,updateCategorySort} from '../services/category';

export default {
    namespace: 'category',
    state: {
        categoryTree: [],
        categoryExpandedKeys:[],
        categroryRightClickKey:'',
        brandExpandedKeys:[],
        hotList:[],
        categoryIconUploadUrl:'/medicone/admin/category/uploadIcon',
        getHotList:[],
        hotItemSort:'',
        parentCategory:{},
        categoryItem:{},
        editModelVisible:false,
        editModelTitle:'',
        editModelType:'create'
    },
    effects: { 
        * queryCategory({ payload }, { select, call, put }) { 
            const data = yield call(queryCategory,{...payload, type:1}); 
            if (data.errorCode!=0) {
                let categoryTree = [];
                data.data.map((item)=>{
                    categoryTree.push(item);
                    if(item.id==1){
                       item.children.map((item,i)=>{
                        let fileList=[];
                        if(item.iconUrl!=null&&item.iconUrl!=''){
                          let file={
                            uid: -i,
                            name: item.id,
                            status: 'done',
                            url: item.iconUrl,
                          }
                          fileList.push(file);
                        } 
                        item.fileList=fileList;
                       })
                    }
                });
                yield put({
                    type: 'queryCategorySuccess',
                    payload: {
                        categoryTree: categoryTree,
                    }
                });
            }
        },
        * queryHot({ payload }, { select, call, put }) { 
            const data = yield call(getHotList,{id:1}); 
            if (data.errorCode!=0) {
                let hotList=[];
                data.data.map((item)=>{
                    if(item.id==1){
                       item.children.map((item,i)=>{
                        let fileList=[];
                        if(item.iconUrl!=null&&item.iconUrl!=''){
                          let file={
                            uid: -i,
                            name: item.id,
                            status: 'done',
                            url: item.iconUrl,
                          }
                          fileList.push(file);
                        } 
                        item.fileList=fileList;
                        hotList.push(item);
                       })
                    }
                });
                yield put({
                    type: 'queryCategorySuccess',
                    payload: {
                        hotList:hotList
                    }
                });
            }
        },
        * findCategoryById({ payload }, { select, call, put }) { 
            const data = yield call(queryById,{...payload}); 
            if (data.errorCode!=0) {
                yield put({
                    type: 'showEditModelVisible',
                    payload: {
                        editModelType: 'update',
                        categoryItem:data.data
                    }
                });
            }
        },
        * createCategory({ payload }, { select, call, put }) {
            const data = yield call(insertCategory,{...payload}); 
            yield put({ type: 'queryCategory' });
            yield put({ type: 'hideEditModelVisible' });
        },
        * updateCategory({ payload }, { select, call, put }) {
            const data = yield call(updateById,{...payload}); 
            yield put({ type: 'queryCategory' });
            yield put({ type: 'hideEditModelVisible' });
        },
        * updateCategorySort({ payload }, { select, call, put }) {
            const data = yield call(updateCategorySort,{...payload}); 
            yield put({ type: 'queryCategory' });
            yield put({ type: 'hideEditModelVisible' });
        },
    },
    reducers: {
        queryCategorySuccess(state, action){
            return {...state , ...action.payload };
        },
        showEditModelVisible(state, action) {
            let id = action.payload.key;
            if(action.payload.editModelType=='create'){
                if(id!=0){
                    let parentCategory={id:id}
                    return {...state,parentCategory:parentCategory,editModelTitle:'添加子类目', editModelVisible: true };
                }else{
                    let parentCategory={id:0}
                    return {...state, parentCategory:parentCategory,editModelTitle:'添加一级类目',editModelVisible: true };
                }
            }else if(action.payload.editModelType=='update'){

                return {...state,...action.payload, editModelTitle:'修改类目名称',editModelVisible: true };
            }
            return {...state, editModelVisible: true };
        }, 
        hideEditModelVisible(state, action) {
            return {...state, categoryItem:{},editModelVisible: false };
        },
        changeCategoryItem(state, action){
            let categoryItem = state.categoryItem;
            let key = action.payload.key;
            categoryItem[key] = action.payload.value;
            return {...state, categoryItem: categoryItem };
        },
        changeHotItemFileList(state, action){
            let hotList=state.hotList;
            hotList.map((item,i)=>{
                if((i+1)==action.payload.id){
                    item.fileList=action.payload.fileList;
                }
            })
            return {...state , hotList:hotList };
        },
        changeHotItem(state, action){
            return {...state , ...action.payload };
        },
        changeExpandedKeys(state, action){
            let categoryExpandedKeys=state.categoryExpandedKeys;
            let isHave=false;
            categoryExpandedKeys.map((item,i)=>{
                if(item==action.payload.key){
                    categoryExpandedKeys.splice(i, 1);
                    isHave=true;
                }
            });
            if(!isHave){
                categoryExpandedKeys.push(action.payload.key+'');
            };
            return {...state , categoryExpandedKeys:categoryExpandedKeys };
        },
        changeBrandExpandedKeys(state, action){
            let brandExpandedKeys=state.brandExpandedKeys;
            let isHave=false;
            brandExpandedKeys.map((item,i)=>{
                if(item==action.payload.key){
                    brandExpandedKeys.splice(i, 1);
                    isHave=true;
                }
            });
            if(!isHave){
                brandExpandedKeys.push(action.payload.key+'');
            };
            return {...state , brandExpandedKeys:brandExpandedKeys };
        },
        categroryRightClickKey(state, action){
            return {...state , categroryRightClickKey:action.payload.id };
        }
    }
}

