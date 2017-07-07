import { queryProduct,insertProduct,deleteProduct,updateProduct,deleteProductImage,queryProductById} from '../services/product';
import { queryCategory,queryCategoryBrand} from '../services/category';
import { hashHistory} from 'dva/router';

export default {
    namespace: 'product',
    state: {
        list:[],//产品列表
        categoryOneLevel:[],//分类
        categoryTwoLevel:[],
        categoryThreeLevel:[],
        brandOneLevel:[],//品牌
        brandTwoLevel:[],
        brandThreeLevel:[],
        searchStr:'',//输入框产品关键字
        total: null,//设备总数
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的产品对象
        uploadUrl:'/medicone/admin/product/uploadImages',
        editProductTitle:'',
        fileListShow:[],
        fileListShow1: [],//展示图片列表
        fileListShow2: [],//展示图片列表
        fileListShow3: [],//展示图片列表
        fileListShow4: [],//展示图片列表
        fileListShow5: [],//展示图片列表
        fileListDetail:[],
        fileListDetail1:[],//详细图片列表
        fileListDetail2:[],//详细图片列表
        fileListDetail3:[],//详细图片列表
        fileListDetail4:[],//详细图片列表
        fileListDetail5:[],//详细图片列表
        rentType:[{"show": "0", "rent": "","tenancy":""},{"show": "0", "rent": "","tenancy":""},{"show": "0", "rent": "","tenancy":""},{"show": "0", "rent": ""}]// 租赁方式
    },
    effects: { 
        * initEditProduct({ payload }, { select, call, put }) {
            yield put({ type: 'clearfileList' }); 
            const data = yield call(insertProduct,{status:-1}); 
            if (data&&data.errorCode==1) {
                let currentItem={id:data.data};

                yield put({
                    type: 'queryProductSuccess',
                    payload: {
                        currentItem: currentItem
                    }
                });
                yield put({ type: 'queryProductSuccess',payload:{editProductTitle:'添加产品'} }); 
                hashHistory.push({pathname:'/product/edit'});
            }
        },
        * queryCategory({ payload }, { select, call, put }) { 
            const categoryData = yield call(queryCategory,{type:1}); 
            const brandData = yield call(queryCategoryBrand,{type:2}); 
            let categoryOneLevel=[];
            let brandOneLevel=[];
            if(categoryData&&categoryData.errorCode==1){
                categoryData.data.map((item)=>{
                    categoryOneLevel.push(item);
                })
            }
            if(brandData&&brandData.errorCode==1){
                brandData.data.map((item)=>{
                    brandOneLevel.push(item);
                })
            }
            yield put({ 
                type: 'queryProductSuccess',
                payload:{
                    categoryOneLevel:categoryOneLevel,
                    brandOneLevel:brandOneLevel
                }
            });
        },
        * queryProduct({ payload }, { select, call, put }) { 
            yield put({ type: 'showLoading' }); 
            const data = yield call(queryProduct,{...payload}); 
            if (data&&data.errorCode==1) {
                yield put({
                    type: 'queryProductSuccess',
                    payload: {
                        list: data.data.list,
                        total: data.data.total,
                        current: data.data.current,
                        loading: false
                    }
                });
            }else{
                yield put({
                    type: 'queryProductSuccess',
                    payload: {
                        loading: false
                    }
                });
            }
        },
        * queryProductById({ payload }, { select, call, put }) { 
            const data = yield call(queryProductById,{...payload}); 
            if (data&&data.errorCode==1) {
                yield put({
                    type: 'queryProductByIdSuccess',
                    payload: {
                        currentItem: data.data,
                    }
                });
            }
        },
        * deleteProduct({ payload }, { select, call, put }) {
            const data = yield call(deleteProduct,{...payload});
            yield put({ type: 'queryProduct' }); 
        },
        * updateProduct({ payload }, { select, call, put }) {
            yield call(updateProduct,{...payload.currentItem});
            hashHistory.push({pathname:'/product'});
        },
        * removeShowImages({ payload }, { select, call, put }){
            const data = yield call(deleteProductImage,{...payload});
        },
    },
    reducers: {
        queryProductSuccess(state, action){
            return {...state , ...action.payload };
        },
        queryProductByIdSuccess(state,action){
            let fileListShow=[];
            let fileListDetail=[];
            let item=action.payload.currentItem;
            if(item.showImages!=null&&item.showImages.length > 0 ){
                fileListShow=JSON.parse(item.showImages);
            }else{
                fileListShow=[{"id": "1", "url": ""},{"id": "2", "url": ""},{"id": "3", "url": ""},{"id": "4", "url": ""},{"id": "5", "url": ""}];
            }
            if(item.detailImages!=null&&item.detailImages.length > 0 ){
                fileListDetail=JSON.parse(item.detailImages);
            }else{
                fileListDetail=[{"id": "1", "url": ""},{"id": "2", "url": ""},{"id": "3", "url": ""},{"id": "4", "url": ""},{"id": "5", "url": ""}];
            }
            return {...state, fileListShow:fileListShow,fileListDetail:fileListDetail};
        },
        showLoading(state, action) {
            return {...state, loading: true };
        }, 
        clearfileList(state, action){
            return {...state, fileListShow: [],fileListDetail:[]};
        },
        //修改查询参数
        searchStrChange(state, action){
            return {...state, ...action.payload };
        },
        //修改分页参数
        changeCurrent(state, action) {
            return {...state, ...action.payload };
        },
        //修改当前设备对象的属性
        productItemChange(state, action){
            let currentItem = state.currentItem;
            let key = action.payload.key;
            currentItem[key] = action.payload.value;
            return {...state, currentItem: currentItem };
        },
        //选择设备对象
        selectCurrentItem(state, action) {
            let currentItem={};
            let rentType=[];
            let fileListShow=[];
            let fileListShow1=[];
            let fileListShow2=[];
            let fileListShow3=[];
            let fileListShow4=[];
            let fileListShow5=[];
            let fileListDetail=[];
            let fileListDetail1=[];
            let fileListDetail2=[];
            let fileListDetail3=[];
            let fileListDetail4=[];
            let fileListDetail5=[];
            state.list.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                    if(item.showImages!=null&&item.showImages.length > 0 ){
                        fileListShow=JSON.parse(item.showImages);
                        fileListShow.map((item,i)=>{
                            if(item.url!=null&&item.url!=''){
                                let file={
                                       linkUrl:item.url,
                                       url:item.url,
                                       uid:item.id,
                                       id:item.id,
                                       name:item.id, 
                                       status:'done',  
                                }
                                if((i+1)==1){
                                    fileListShow1.push(file)
                                }else if((i+1)==2){
                                    fileListShow2.push(file)
                                }
                                else if((i+1)==3){
                                    fileListShow3.push(file)
                                }
                                else if((i+1)==4){
                                    fileListShow4.push(file)
                                }
                                else if((i+1)==5){
                                    fileListShow5.push(file)
                                }
                            }
                        })
                    }
                    if(item.detailImages!=null&&item.detailImages.length > 0 ){
                        fileListDetail=JSON.parse(item.detailImages);
                        fileListDetail.map((item,i)=>{
                            if(item.url!=null&&item.url!=''){
                                let file={
                                       linkUrl:item.url,
                                       url:item.url,
                                       uid:item.id,
                                       id:item.id,
                                       name:item.id, 
                                       status:'done',  
                                }
                                if((i+1)==1){
                                    fileListDetail1.push(file)
                                }else if((i+1)==2){
                                    fileListDetail2.push(file)
                                }
                                else if((i+1)==3){
                                    fileListDetail3.push(file)
                                }
                                else if((i+1)==4){
                                    fileListDetail4.push(file)
                                }
                                else if((i+1)==5){
                                    fileListDetail5.push(file)
                                }
                            }
                        })
                    }else{
                        fileListDetail=[fileListDetail1:[],fileListDetail2:[],fileListDetail3:[],fileListDetail4:[],fileListDetail5:[],];
                    }
                    if(item.rentType!=null&&item.rentType.length > 0 ){
                        rentType=JSON.parse(item.rentType);
                    }else{
                        rentType=[{"show": "", "rent": "","tenancy":""},{"show": "", "rent": "","tenancy":""},{"show": "", "rent": "","tenancy":""},{"show": "", "rent": ""}];
                    }

                }
            })
            return {...state, currentItem:currentItem ,rentType:rentType,fileListShow:fileListShow,fileListDetail:fileListDetail,
                fileListShow1:fileListShow1,fileListShow2:fileListShow2,fileListShow3:fileListShow3,fileListShow4:fileListShow4,fileListShow5:fileListShow5,
                fileListDetail1:fileListDetail1,fileListDetail2:fileListDetail2,fileListDetail3:fileListDetail3,fileListDetail4:fileListDetail4,fileListDetail5:fileListDetail5};
        },
        //修改分类
        changeCategory(state, action) {
            if(action.payload.level==1){
                let categoryTwoLevel=[];
                state.categoryOneLevel.map((item)=>{
                    if(item.id==action.payload.id){
                        item.children.map((item)=>{
                            categoryTwoLevel.push(item);
                        })
                    }
                })
                return {...state, categoryTwoLevel:categoryTwoLevel};
            }else if(action.payload.level==2){
                let categoryThreeLevel=[];
                state.categoryTwoLevel.map((item)=>{
                    if(item.id==action.payload.id){
                        item.children.map((item)=>{
                            categoryThreeLevel.push(item);
                        })
                    }
                })
                return {...state, categoryThreeLevel:categoryThreeLevel};
            }else if(action.payload.level==3){
                let currentItem = state.currentItem;
                currentItem.category=action.payload.id;
                return {...state, currentItem:currentItem};
            }
        },
        //修改品牌
        changeBrand(state, action) {
            if(action.payload.level==1){
                let brandTwoLevel=[];
                state.brandOneLevel.map((item)=>{
                    if(item.id==action.payload.id){
                        item.children.map((item)=>{
                            brandTwoLevel.push(item);
                        })
                    }
                })
                return {...state, brandTwoLevel:brandTwoLevel};
            }else if(action.payload.level==2){
                let brandThreeLevel=[];
                state.brandTwoLevel.map((item)=>{
                    if(item.id==action.payload.id){
                        item.children.map((item)=>{
                            brandThreeLevel.push(item);
                        })
                    }
                })
                return {...state, brandThreeLevel:brandThreeLevel};
            }else if(action.payload.level==3){
                let currentItem = state.currentItem;
                currentItem.model=action.payload.id;
                return {...state, currentItem:currentItem};
            }
        },
        updateProductSuccess(state, action) {
            let userlist = state.userList;
            userlist.map((item, i) => {
                if (item.id === state.currentItem.id) {
                    userlist.splice(i, 1, state.currentItem);
                };
            })
            return {...state, userlist: userlist, currentItem: {} };
        },
        rentTypeChange(state, action){
            let rentType=state.rentType;
            rentType.map((item,i)=>{
                if((i+1)==action.payload.rentId){
                    if(action.payload.checked){
                        item.show=1;
                    }else{
                        item.show=0;
                    }
                }
            })
            return {...state, rentType:rentType };
        },
        rentTypeContentChange(state, action){
            let rentType=state.rentType;
            rentType.map((item,i)=>{
                if((i+1)==action.payload.rentId){
                    item[action.payload.key]=action.payload.value;
                }
            })
            return {...state, rentType:rentType };
        },
        fileListShowChange(state, action){
            let fileListShow1=state.fileListShow1;
            let fileListShow2=state.fileListShow2;
            let fileListShow3=state.fileListShow3;
            let fileListShow4=state.fileListShow4;
            let fileListShow5=state.fileListShow5;
            if(action.payload.id==1){
                fileListShow1=action.payload.fileList;
            }else if(action.payload.id==2){
                fileListShow2=action.payload.fileList;
            }else if(action.payload.id==3){
                fileListShow3=action.payload.fileList;
            }else if(action.payload.id==4){
                fileListShow4=action.payload.fileList;
            }else if(action.payload.id==5){
                fileListShow5=action.payload.fileList;
            }
            return {...state, fileListShow1:fileListShow1,fileListShow2:fileListShow2,fileListShow3:fileListShow3,fileListShow4:fileListShow4,fileListShow5:fileListShow5};
        },
        fileListDetailChange(state, action){
            let fileListDetail1=state.fileListDetail1;
            let fileListDetail2=state.fileListDetail2;
            let fileListDetail3=state.fileListDetail3;
            let fileListDetail4=state.fileListDetail4;
            let fileListDetail5=state.fileListDetail5;
            if(action.payload.id==1){
                fileListDetail1=action.payload.fileList;
            }else if(action.payload.id==2){
                fileListDetail2=action.payload.fileList;
            }else if(action.payload.id==3){
                fileListDetail3=action.payload.fileList;
            }else if(action.payload.id==4){
                fileListDetail4=action.payload.fileList;
            }else if(action.payload.id==5){
                fileListDetail5=action.payload.fileList;
            }
            return {...state, fileListDetail1:fileListDetail1,fileListDetail2:fileListDetail2,fileListDetail3:fileListDetail3,fileListDetail4:fileListDetail4,fileListDetail5:fileListDetail5};
        }
    }
}
