import React from 'react';
import { Modal,Input, Icon,Button,Row,Col} from 'antd';
import isNullObject from '../../utils/common.js'
import './EditCategoryBrand.css'

class EditCategoryBrand extends React.Component {
	handleOk=()=> {
		if(this.props.brand.categoryItem.id){
			this.props.dispatch({
	         type: 'brand/updateCategory',
	         payload:{
	         	id:this.props.brand.categoryItem.id,
	         	name:this.props.brand.categoryItem.name
	         }
	        });
	    }else{
	    	this.props.dispatch({
	         type: 'brand/createCategory',
	         payload:{
	         	parentId:this.props.brand.parentCategory.id,
	         	name:this.props.brand.categoryItem.name,
	         	type:2,
	         }
	        });
	    }
	}
	handleCancel=(e)=> {
	    this.props.dispatch({
         type: 'brand/hideEditModelVisible',
        });
	}
	emitEmpty = () => {
	    this.userNameInput.focus();
	    this.props.dispatch({
         type: 'brand/changeCategoryItem',
         payload:{
         	key:'name',
         	value:''
         }
        });
	}
	onChangeUserName = (e) => {
		this.props.dispatch({
         type: 'brand/changeCategoryItem',
         payload:{
         	key:'name',
         	value:e.target.value
         }
        });
	}
    render() {
	    return (
            <Modal title={this.props.brand.editModelTitle} visible={this.props.brand.editModelVisible}
	          onOk={this.handleOk} onCancel={this.handleCancel}>
	          {this.props.brand.parentCategory?this.props.brand.parentCategory.name:''}
	          <Input
		        placeholder="请输入名称"
		        prefix={<Icon type="exception" />}
		        suffix={!isNullObject(this.props.brand.categoryItem)?<Icon type="close-circle" onClick={this.emitEmpty} />:null}
		        value={!isNullObject(this.props.brand.categoryItem)?this.props.brand.categoryItem.name:''}
		        onChange={this.onChangeUserName}
		        ref={node => this.userNameInput = node}
		      />
	        </Modal>
	    );
    }
};

export default EditCategoryBrand;
