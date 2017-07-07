import { query ,deleteBanner,updateBanner} from '../services/banner';

export default {
    namespace: 'banner',
    state: {
        fileList1: [],
        fileList2: [],
        fileList3: [],
        bottomFile:[],
        previewVisible: false,
        currentItem:{},
        previewImage: '',
        uploadBannerUrl:'/medicone/admin/banner/uploadBanner',
        uploadBottmUrl:'/medicone/admin/banner/uploadBottm',
    },
    effects: { 
        * queryFileList({ payload }, { select, call, put }) { 
            const data = yield call(query);
            if (data&&data.errorCode==1) {
                let filelist=[];
                let bottomFile=[];
				data.data.list.map((item,i)=>{
                    if(item.type==1){
                        let file={
                        uid: -i,
                        id:item.id,
                        name: item.id,
                        status: 'done',
                        linkUrl:item.linkUrl,
                        url: item.imgUrl,
                        }
                        filelist.push(file);
                    }else if(item.type==2){
                        let file={
                        uid: -i,
                        id:item.id,
                        name: item.id,
                        status: 'done',
                        linkUrl:item.linkUrl,
                        url: item.imgUrl,
                        }
                        bottomFile.push(file);
                    }
				})
                let fileList1=[];
                let fileList2=[];
                let fileList3=[];
                filelist.map((item,i)=>{
                        if(i==0){
                            fileList1.push(item);
                        }else if(i==1){
                            fileList2.push(item);
                        }else if(i==2){
                            fileList3.push(item);
                        }
                    })
                yield put({
                    type: 'fileListChange',
                    payload: {
                        fileList1: fileList1,
                        fileList2: fileList2,
                        fileList3: fileList3,
                        bottomFile:bottomFile
                    }
                });
            }
        },
        * updateFileList({ payload }, { select, call, put }) {
        	const data = yield call(deleteBanner,{...payload});
        },
        * updateCurrentItemLinkUrl({ payload }, { select, call, put }) {
            let banner={
                id:payload.currentItem.id,
                linkUrl:payload.currentItem.linkUrl
            }
            const data = yield call(updateBanner,{...banner});
            yield put({type: 'updateBannerLinkUrlSuccess'});
        },
    },
    reducers: {
        fileListChange(state, action) {
            return {...state,...action.payload};
        },
        showPreview(state, action){
        	return {...state,...action.payload };
        },
        hidePreview(state, action){
        	return {...state,previewVisible: false};
        },
        queryFileListSuccess(state, action){
        	return {...state,...action.payload };
        },
        updateBannerLinkUrlSuccess(state,action){
            return {...state, currentItem: {} };
        },
        currentItemEditChange(state,action){
            let currentItem={};
            state.fileList1.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                }
            })
            state.fileList2.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                }
            })
            state.fileList3.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                }
            })
            state.bottomFile.map((item)=>{
                if(item.id==action.payload.id){
                    currentItem=item;
                }
            })
            return {...state, currentItem: currentItem };
        },
        currentItemChange(state,action){
            let currentItem=state.currentItem;
            currentItem.linkUrl=action.payload.linkUrl;
            return {...state, currentItem: currentItem };
        }
    }
}
