import React from 'react';
import {Input,Upload,Icon,Button,Alert} from 'antd';
import './System.css';

class UserDetail extends React.Component{
    componentDidMount () {
        this.props.dispatch({
		    type: 'login/getSys',
       	});
	}
	telInput=(e)=>{
		this.props.dispatch({
		    type: 'login/change',
		    payload:{
		    	sysTel:e.target.value
		    }
       	});
	}
	emailInput=(e)=>{
		this.props.dispatch({
		    type: 'login/change',
		    payload:{
		    	sysEmail:e.target.value
		    }
       	});
	}
	updateSys=()=>{
		this.props.dispatch({
		    type: 'login/updateSys',
		    payload:{
		    	id:1,
		    	tel:this.props.login.sysTel,
		    	email:this.props.login.sysEmail
		    }
       	});
	}
    render() {
	    return (
	       <div>
	         {this.props.login.sysEditMessage?<Alert className="editSuccess" message="修改成功" type="success" />:''}
	         <div><h3>咨询电话</h3></div>
	         <div>
	         	<Input onChange={this.telInput} className="telInput" placeholder="请输入咨询电话" value={this.props.login.sysTel}/>
	         </div>
	         <div><h3>咨询邮箱</h3></div>
	         <div>
	         	<Input onChange={this.emailInput} className="telInput" placeholder="请输入咨询邮箱" value={this.props.login.sysEmail}/>
	         </div>
	         <Button type="primary" onClick={this.updateSys} style={{marginLeft:12}}>确认</Button>
		   </div>
	    );
    }
};

export default UserDetail;