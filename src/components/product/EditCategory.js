import React from 'react';
import { Modal,Input, Icon,Button,Row,Col} from 'antd';
import isNullObject from '../../utils/common.js'
import './EditCategory.css'

class EditCategory extends React.Component {
	handleOk=()=> {
		if(this.props.category.categoryItem.id){
			this.props.dispatch({
	         type: 'category/updateCategory',
	         payload:{
	         	id:this.props.category.categoryItem.id,
	         	name:this.props.category.categoryItem.name
	         }
	        });
	    }else{
	    	this.props.dispatch({
	         type: 'category/createCategory',
	         payload:{
	         	parentId:this.props.category.parentCategory.id,
	         	name:this.props.category.categoryItem.name,
	         	type:1,
	         }
	        });
	    }
	}
	handleCancel=(e)=> {
	    this.props.dispatch({
         type: 'category/hideEditModelVisible',
        });
	}
	emitEmpty = () => {
	    this.userNameInput.focus();
	    this.props.dispatch({
         type: 'category/changeCategoryItem',
         payload:{
         	key:'name',
         	value:''
         }
        });
	}
	onChangeUserName = (e) => {
		this.props.dispatch({
         type: 'category/changeCategoryItem',
         payload:{
         	key:'name',
         	value:e.target.value
         }
        });
	}
    render() {
	    return (
            <Modal title={this.props.category.editModelTitle} visible={this.props.category.editModelVisible}
	          onOk={this.handleOk} onCancel={this.handleCancel}>
	          {this.props.parentCategory?this.props.parentCategory.name:''}
	          <Input
		        placeholder="请输入目录名称"
		        prefix={<Icon type="exception" />}
		        suffix={!isNullObject(this.props.category.categoryItem)?<Icon type="close-circle" onClick={this.emitEmpty} />:null}
		        value={!isNullObject(this.props.category.categoryItem)?this.props.category.categoryItem.name:''}
		        onChange={this.onChangeUserName}
		        ref={node => this.userNameInput = node}
		      />
	        </Modal>
	    );
    }
};

export default EditCategory;
