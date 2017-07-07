import React from 'react';
import { Card ,Switch ,Row ,Col} from 'antd';
import './Partner.css'

class Partner extends React.Component {
  componentDidMount () {
  	this.props.dispatch({
         type: 'provider/query',
       });
  }
  isShow(id){
		this.props.dispatch({
         type: 'provider/updateProviderIsShow',
         payload: {
         	id:id,
         	list:this.props.provider.list
     	 }
        });
	}
  render() {
    return (
      <div className="partner-box">
      	<div style={{marginBottom:15}}><h3>合作伙伴</h3></div>
      	<Row gutter={36}>
      	  {this.props.provider.list.map((item,i)=>{
      	  	let isShow='';
  		    	if(item.isShow==1){
  					isShow=true;
  		    	}else{
  		    		isShow=false;
  		    	}
      	  	return (<Col xs={12} sm={9} md={6} lg={3} key={i} style={{marginBottom:15}}>
      	  				<Card style={{ width: 100 }} bodyStyle={{ height:120,padding: 0 }}>
						    <div className="partner-custom-image">
						      <img style={{height:60,borderBottom:'1px solid rgb(228, 228, 228)'}} width="100%" src={item.iconUrl} />

						    </div>
						    <div className="custom-card partner-custom-card">
                  <div className="partner-name">{item.name}</div>
						      <Switch checkedChildren={'展示'} checked={isShow} unCheckedChildren={'隐藏'} onChange={()=>this.isShow(item.id)}/>
						    </div>
						 </Card>
					</Col>)
      	  })}
	    </Row>
      </div>
    );
  }
};


export default Partner;