import React, { Component, PropTypes } from 'react';
import { Card ,Row ,Col,Input,Button,Modal,Popconfirm} from 'antd';
import './Brand.css'
class BrandList extends React.Component{
    componentDidMount () {
       this.props.dispatch({
         type: 'brand/query',
       });
	}
	editClick(id){
		this.props.dispatch({
          type: 'brand/currentItemEditChange',
          payload:{
          	id : id
          }
     	});
	}
	brandEdit=()=>{
		this.props.dispatch({
          type: 'brand/update',
          payload: {
          	currentItem:this.props.brand.currentItem
          }
     	});
	}
	deleteClick(id){
		let currentItem={id:id,status:0}
		this.props.dispatch({
          type: 'brand/update',
          payload: {
          	currentItem:currentItem
          }
     	});
	}
	addClick=()=>{
		this.props.dispatch({
          type: 'brand/showAddModalVisible',
     	});
	}
	currentItemChange=(e)=>{
		this.props.dispatch({
          type: 'brand/currentItemChange',
          payload: {
          	key:'name',
          	value:e.target.value
          }
     	});
	}
	handleOk=()=>{
		this.props.dispatch({
          type: 'brand/insert',
          payload: {
          	currentItem:this.props.brand.currentItem
          }
     	});
	}
	handleCancel=()=>{
		this.props.dispatch({
          type: 'brand/hideAddModalVisible',
     	});
	}
	updateBrand(text){
	 this.props.dispatch({
          type: 'provider/showUserModal',
          payload: {
          	id:text.id,
          	userModalType:'update',
          	userModalTitle:' 修改人员'
          }
     });
	}
	deleteBrand(text){
		this.props.dispatch({
          type: 'provider/deleteUser',
          payload: {id:text.id}, 
        });
	}
    render() {
	    return (
	       <div>
	       	<Modal title="添加品牌" visible={this.props.brand.addModalVisible}
	          onOk={this.handleOk} onCancel={this.handleCancel}>
	          <Input placeholder="请输入品牌名称" value={this.props.brand.currentItem?this.props.brand.currentItem.name:''} onChange={this.currentItemChange}/>
	        </Modal>
	       	 <div className="brandTitle"><Button type="primary" onClick={this.addClick}>添加品牌</Button></div>
	       	 <Row gutter={16}>
	       	 {this.props.brand.list.length>0?this.props.brand.list.map((item)=>{
	       	 	let currentItem=this.props.brand.currentItem;
	       	 	let disabled=true;
	       	 	let editButtonClass='';
	       	 	let saveButtonClass='';
	       	 	if(currentItem){
	       	 		if(currentItem.id==item.id){
						disabled=false;
						editButtonClass='buttonDisplay';
	       	 		}else{
	       	 			saveButtonClass='buttonDisplay';
	       	 		}
	       	 	}
	       	 	return (<Col className="gutter-row" span={6} key={item.id}>
					        <div className="gutter-box">
					        <Card title={<Input value={item.name} disabled={disabled} onChange={this.currentItemChange}/>} className="brandInput" bordered style={{ width: 200 }}>
						      <Button type="ghost" className={editButtonClass} onClick={()=>this.editClick(item.id)}>编辑名称</Button>
						      <Button type="primary" className={saveButtonClass} onClick={this.brandEdit}>保存名称</Button>
						      <Popconfirm title="确定删除这个品牌么?" onConfirm={()=>this.deleteClick(item.id)} okText="确认" cancelText="取消">
							    <Button type="ghost">删除品牌</Button>
							  </Popconfirm>
						    </Card>
					    	</div>
					      </Col>);
	       	 }):''}
		    </Row>
		   </div>
	    );
    }
};

export default BrandList;