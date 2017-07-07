import { queryCategoryBrand ,insertCategory,queryById,updateById} from '../services/category';

export default {
    namespace: 'brand',
    state: {
        categoryTree: [],
        parentCategory:{},
        categoryItem:{},
        editModelVisible:false,
        editModelTitle:'',
        editModelType:'create'
    },
    effects: { 
        * queryCategory({ payload }, { select, call, put }) { 
            const data = yield call(queryCategoryBrand,{...payload,type:2}); 
            if (data.errorCode!=0) {
                let categoryTree = [];
                data.data.map((item)=>{
                    categoryTree.push(item);
                });
                yield put({
                    type: 'queryCategorySuccess',
                    payload: {
                        categoryTree: categoryTree,
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
        * delete() {},
        * updateCategory({ payload }, { select, call, put }) {
            const data = yield call(updateById,{...payload}); 
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
                    return {...state,parentCategory:parentCategory,editModelTitle:'添加型号', editModelVisible: true };
                }else{
                    let parentCategory={id:0}
                    return {...state, parentCategory:parentCategory,editModelTitle:'添加品牌',editModelVisible: true };
                }
            }else if(action.payload.editModelType=='update'){

                return {...state,...action.payload, editModelTitle:'修改型号名称',editModelVisible: true };
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
        }
    }
}

