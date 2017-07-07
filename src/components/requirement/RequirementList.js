import React, { Component, PropTypes } from 'react';
import { Modal,Table, message, Popconfirm ,Row, Col,Input,Select,Button,Icon,Form,Switch} from 'antd';
import isNullObject from '../../utils/common';
const Option=Select.Option;
const FormItem = Form.Item;
import './Requirement.css'

let deleteStr=[];

class Requirement extends React.Component{
    componentDidMount () {
       this.props.dispatch({
         type: 'requirement/query',
       });
	}
	componentDidUpdate(){
		deleteStr.map((item)=>{
			let table=document.getElementsByClassName('ant-table-tbody');
			if(table[0].children.length>0){ 
				table[0].children[item].className = "tableDeleteBack"; 
			} 
		})
	}
	queryRequirement=()=>{
		this.props.dispatch({
	         type: 'requirement/query',
	         payload:{
	         	title:this.props.requirement.seachStr,
	         	status:this.props.requirement.status
	         }
       });
	}
	review(text){
      	this.props.dispatch({
	         type: 'requirement/review',
	         payload:{
	         	id:text.id,
	         	list:this.props.requirement.list
	         }
        });
	}
	delete(text){
		deleteStr=[];
		this.props.dispatch({
         type: 'requirement/deleteRequirement',
         payload:{
         	id:text.id
         }
       });
	}
	requirementStrChange=(e)=>{
		this.props.dispatch({
          type: 'requirement/requirementSearchChange',
          payload: {seachStr:e.target.value}, 
        });
	}
	requirementStatusChange=(e)=>{
		this.props.dispatch({
          type: 'requirement/requirementSearchChange',
          payload: {status:e}, 
        });
	}
	showModel=(text)=>{
		this.props.dispatch({
          type: 'requirement/selectRequirementItem',
          payload: {id:text.id}, 
        });
        this.props.dispatch({
          type: 'requirement/showModal',
        });
	}
	itemChange=(e)=>{
		this.props.dispatch({
          type: 'requirement/itemChange',
          payload: {key:e.target.name,value:e.target.value}, 
        });
	}
	handleOk=()=>{
		this.props.dispatch({
          type: 'requirement/update',
          payload: {...this.props.requirement.currentItem}, 
        });
        this.props.dispatch({
          type: 'requirement/hideModal',
        });
	}
	handleCancel=()=>{
		this.props.dispatch({
          type: 'requirement/hideModal',
        });
	}
	changeInputDisabled=()=>{
		this.props.dispatch({
          type: 'requirement/changeInputDisabled',
        });
	}
	saveItem=()=>{
		this.props.dispatch({
          type: 'requirement/update',
          payload: {...this.props.requirement.currentItem}, 
        });
        this.props.dispatch({
          type: 'requirement/changeInputDisabled',
        });
	}
    render() {
    	const columns = [
    	  {
		    title: '序号',
		    dataIndex: 'id',
		    key: 'id',
		    width:50,
		    onCellClick:this.showModel,
		    render:(text, record, index) => (
             <span>{index + 1}</span>
            )
		  },{
		    title: '用户账号',
		    dataIndex: 'username',
		    key: 'username',
		    width:100,
		    onCellClick:this.showModel
		  },{
		    title: '编号',
		    dataIndex: 'number',
		    key: 'number',
		    width:120,
		    onCellClick:this.showModel
		  },{
		    title: '标题',
		    dataIndex: 'title',
		    key: 'title',
		    width:120,
		    onCellClick:this.showModel
		  },{
		    title: '预算',
		    dataIndex: 'budget',
		    key: 'budget',
		    width:80,
		    onCellClick:this.showModel
		  },{
		    title: '地址',
		    dataIndex: 'address',
		    key: 'address',
		    width:100,
		    onCellClick:this.showModel
		  },{
		    title: '使用时间',
		    dataIndex: 'lifeTimer',
		    key: 'lifeTimer',
		    width:130,
		    onCellClick:this.showModel,
		    render: (text, record) => {
		      return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
		    },
		  },{
		    title: '联系人',
		    dataIndex: 'linkman',
		    key: 'linkman',
		    width:80,
		    onCellClick:this.showModel
		  },{
		    title: '电话',
		    dataIndex: 'tel',
		    key: 'tel',
		    width:100,
		    onCellClick:this.showModel
		  },{
		    title: '需求说明',
		    dataIndex: 'description',
		    key: 'description',
		    width:100,
		    onCellClick:this.showModel,
		    render: (text, record) => (
		      <div>{text!=null?text.substring(0,10):''}{text!=null&&text.length>10?'...':''}</div>
		    ),
		  },{
		    title: '创建时间',
		    dataIndex: 'createTime',
		    key: 'createTime',
		    width:130,
		    onCellClick:this.showModel,
		    render: (text, record) => {
		     return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
		    },
		  }, {
		    title: '操作',
		    key: 'operation',
		    width:120,
		    render: (text, record,index) => {
		    	let checked=false;
		    	if(text.status==1){
		    		checked=true;
		    	}else if(text.status==-1){
		    		deleteStr.push(index);
		    		return (<div><Popconfirm title="选择审核结果" onConfirm={()=>{this.delete(text)}} 
							  okText="删除" cancelText="取消">
							    <a>&emsp;<Icon type="delete" />&emsp;删除</a>
							  </Popconfirm></div>)
		    	}
		    	return (<Switch checked={checked} checkedChildren={'审核通过'} unCheckedChildren={'待审核'} onChange={()=>this.review(text)}/>)
	        },
		  }];
		const pagination = {
		    total:this.props.requirement.total,
		    current:this.props.requirement.current,
		    pageSize: 10,
		    onChange: (value)=>{
		    	this.props.dispatch({
		          type: 'requirement/changeCurrent',
		          payload: {current:value}, 
       			});
		    },
		  };
		const modalTitle=<div className="modalTitle">编辑详情<a onClick={this.changeInputDisabled} className={this.props.requirement.inputDisabled?'':'displayA'}>编辑</a><a onClick={this.saveItem} className={this.props.requirement.inputDisabled?'displayA':''}>保存</a></div>
	    const closable=false
	    return (
	       <div>
	       	<Modal title={modalTitle} visible={this.props.requirement.modalVisible}	closable={closable}
		          onOk={this.handleOk} onCancel={this.handleCancel} className="requirementModal"
		        >
		          <Form inline className="fromItem">
			      <FormItem label="用户账号">
			        <Input style={{width:300}} name="username" disabled={true} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.username:''} />
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="需求编号">
			        <Input style={{width:300}} name="number" disabled={true} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.number:''} />
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="需求标题">
			        <Input style={{width:300}} name="title" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.title:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="需求预算">
			        <Input style={{width:300}} name="budget" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.budget:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form><Form inline className="fromItem">
			      <FormItem label="需求地址">
			        <Input style={{width:300}} name="address" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.address:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="预计使用时间">
			        <Input style={{width:276}} name="lifeTimer" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.lifeTimer:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="联系人">
			        <Input style={{width:312}} name="linkman" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.linkman:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="联系电话">
			        <Input style={{width:300}} name="tel" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.tel:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="需求说明">
			        <Input type="textarea" style={{width:300}} name="description" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.description:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
			      <Form inline className="fromItem">
			      <FormItem label="备注">
			        <Input style={{width:322}} name="remarks" disabled={this.props.requirement.inputDisabled} value={!isNullObject(this.props.requirement.currentItem)?this.props.requirement.currentItem.remarks:''} onChange={this.itemChange}/>
			      </FormItem>
			      </Form>
		    </Modal>
	        <Row gutter={10} className="searchBox">
		      <Col className="gutter-row" span={6}>
		        <div className="gutter-box"><Input placeholder="请输入用户账号或标题" onChange={this.requirementStrChange}/></div>
		      </Col>
		      <Col className="gutter-row" span={3}>
		        <div className="gutter-box">
		        	<Select defaultValue="请选择状态" style={{ width: 120 }} onChange={this.requirementStatusChange}>
				      <Option value="0">待审核</Option>
				      <Option value="1">审核通过</Option>
				      <Option value="-1">已删除</Option>
				    </Select>
		        </div>
		      </Col>
		      <Col className="gutter-row" span={3}>
		        <div className="gutter-box"><Button type="primary" onClick={this.queryRequirement}>搜索需求</Button></div>
		      </Col>
		    </Row>
		        {this.props.requirement.list ==[] ? '' : 
		          <Table
		            bordered
			        columns={columns}
			        dataSource={this.props.requirement.list}
			        loading={this.props.requirement.loading}
			        rowKey={record => record.id}
			        pagination={pagination}
			      />
			    }
		   </div>
	    );
    }
};

export default Requirement;