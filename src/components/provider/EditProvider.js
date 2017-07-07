import React, { Component, PropTypes } from 'react';
import { hashHistory} from 'dva/router';
import { Form, Input, Button,Upload, Icon, message,Modal,Switch} from 'antd';
import './EditProvider.css'
const FormItem = Form.Item;

class EditProvider extends React.Component{
	submitClick=()=>{
		let oldCurrentItem=this.props.provider.currentItem;
		let newCurrentItem={
			id:oldCurrentItem.id,
			name:oldCurrentItem.name,
			description:oldCurrentItem.description,
			isShow:oldCurrentItem.isShow,
			status:1
		}
		this.props.dispatch({
         type: 'provider/updateProvider',
         payload:{
         	currentItem:newCurrentItem
         }
       	});
	}
	cancelEditProvider=()=>{
		hashHistory.push({pathname:'/provider'});
	}
	providerItemChange=(e)=>{
		if(typeof(e) === 'boolean'){
			let isShow='';
			if(e==true){
				isShow=1;
			}else{
				isShow=0;
			}
			this.props.dispatch({
	         type: 'provider/providerItemChange',
	         payload: {
	         	key:'isShow',
	         	value:isShow
	     	 }
	        });
		}else{
			this.props.dispatch({
	         type: 'provider/providerItemChange',
	         payload: {
	         	key:e.target.name,
	         	value:e.target.value
	     	 }
	        });
		}
	}
	handleCancel = () => this.props.dispatch({type: 'provider/hidePreview'})
	handlePreview = (file) => {
	    this.props.dispatch({
	          type: 'provider/showPreview',
	          payload: {
	             previewImage: file.url || file.thumbUrl,
	             previewVisible: true,
	          }
	     });
  	}
  	handleChange=(info)=> {
        this.props.dispatch({
  			type: 'provider/fileListChange',
  			payload: {fileList: info.fileList}
  		})
    }
  	remove=(file)=>{
	    this.props.dispatch({
	        type: 'provider/updateProvider',
	        payload:{
         	    id:this.props.provider.currentItem.id
         	}
	    });
  	}
    render() {
    	const formItemLayout = {
		      labelCol: { span: 4 },
		      wrapperCol: { span: 14 },
		    };
		const formItemButton = {
		      wrapperCol: { span: 12 },
		};
		const { previewVisible, previewImage, fileList } = this.props.provider;
		const uploadButton = (
		      <div>
		        <Icon type="plus" />
		        <div className="ant-upload-text">点击上传</div>
		      </div>
		    );
	    return (
	       <div>
	        <div className="title">{this.props.provider.editProviderTitle}</div>
	        <Form>
	          <FormItem
	            label="合作伙伴logo"
	            {...formItemLayout}
	            className="iconBox"
	          >
	              <Upload
	              	  className="providerUpload"
			          action={this.props.provider.uploadUrl}
			          data={this.props.provider.currentItem}
			          supportServerRender={true}
			          listType="picture-card"
			          fileList={fileList}
			          onPreview={this.handlePreview}
			          onChange={this.handleChange}
			          onRemove={this.remove}
			        >
			          {fileList.length > 0 ? null : uploadButton}
			        </Upload>
			        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
			          <img alt="example" style={{ width: '100%' }} src={previewImage} />
			        </Modal>
	          </FormItem>
	          <FormItem
	            label="合作伙伴名称"
	            {...formItemLayout}
	          >
	            <Input placeholder="请输入合作伙伴名称" value={this.props.provider.currentItem?this.props.provider.currentItem.name:''} name="name" onChange={this.providerItemChange}/>
	          </FormItem>
	          <FormItem
	            label="合作伙伴简介"
	            {...formItemLayout}
	          >
	           <Input type="textarea" rows={4} value={this.props.provider.currentItem?this.props.provider.currentItem.description:''} placeholder="请输入合作伙伴简介" name="description" onChange={this.providerItemChange}/>
	          </FormItem>
	          <FormItem
	            label="合作伙伴是否展示"
	            {...formItemLayout}
	          >
	           <Switch checkedChildren={'开'} unCheckedChildren={'关'} checked={this.props.provider.currentItem&&this.props.provider.currentItem.isShow==1?true:false} onChange={this.providerItemChange}/>
	          </FormItem>
	          <FormItem {...formItemButton} className="formItemButton">
	            <Button type="primary" size="large" style={{marginRight:15}} onClick={this.submitClick}>提交</Button>
	            <Button type="ghost" size="large" onClick={this.cancelEditProvider}>取消</Button>
	          </FormItem>
	        </Form>		
		   </div>
	    );
    }
};

export default EditProvider;