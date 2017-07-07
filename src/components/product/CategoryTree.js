import React from 'react';
import { Tree ,Row ,Col ,Button,Icon,Modal,Popover} from 'antd';
import EditCategory from './EditCategory';
import EditCategoryBrand from './EditCategoryBrand';
import './CategoryTree.css'
const TreeNode = Tree.TreeNode;
function createRight(e){
    let objPos= e.node.props.pos;
    let divHeigth=60;
    let obj=e.event.target;
    let chidren=e.node.props.children;
    let html=''
    if(chidren){
        html='<div class="treePopverContent"><a id="rightAdd"><p>新增</p></a><p class="treePDecollate"></p><a id="rightEdit"><p>修改</p></a></div>';
    }else{
        if(objPos.length!=7){
          divHeigth=90;
          html='<div class="treePopverContent"><a id="rightAdd"><p>新增</p></a><p class="treePDecollate"></p><a id="rightEdit"><p>修改</p></a><p class="treePDecollate"></p><a id="rightDelete"><p>删除</p></a></div>';
        }else{
          html='<div class="treePopverContent"><a id="rightEdit"><p>修改</p></a><p class="treePDecollate"></p><a id="rightDelete"><p>删除</p></a></div>';
        }
    }
      var pos = {"top":0, "left":0};
       if (obj.offsetParent){
         while (obj.offsetParent){
           pos.top += obj.offsetTop;
           pos.left += obj.offsetLeft;
           obj = obj.offsetParent;
         }
       }else if(obj.x){
         pos.left += obj.x;
       }else if(obj.x){
         pos.top += obj.y;
       }
      var child=document.getElementById("descDiv");
      if(child){document.body.removeChild(child);}
      var descDiv = document.createElement('div');
      var seatX = pos.left+120;
      var seatY = pos.top+10;
      var cssStr = "z-index:5;width:80px;height:"+divHeigth+"px;background-color:#FFFFFF;border:1px solid #E8E8E8;position:absolute;left:" 
      + seatX + 'px;top:' + seatY + 'px;';
      descDiv.style.cssText = cssStr;
      descDiv.innerHTML = html;
      descDiv.id = 'descDiv';
      descDiv.style.display = 'block';
      document.body.appendChild(descDiv);
}

class CategoryTree extends React.Component {
    componentDidMount () {
       this.props.dispatch({
           type: 'category/queryCategory',
         });
        this.props.dispatch({
           type: 'brand/queryCategory',
        });
    }
    categoryOnSelect=(key)=> {
      this.props.dispatch({
         type: 'category/changeExpandedKeys',
         payload: {
            key:key
         }
      });
    }
    brandOnSelect=(key)=>{
      this.props.dispatch({
         type: 'category/changeBrandExpandedKeys',
         payload: {
            key:key
         }
      });
    }
    categroryRightClick=(e)=>{
      let self=this;
      createRight(e);
      let clickId=e.event.target.getAttribute("name");
      this.props.dispatch({
         type: 'category/categroryRightClickKey',
         payload: {
            id:clickId,
         }
      });
      if(document.getElementById("rightAdd")){
          document.getElementById("rightAdd").addEventListener("click", function(){
            self.addClick(clickId);
          });
      }
      if(document.getElementById("rightDelete")){
          document.getElementById("rightDelete").addEventListener("click", function(){
            self.deleteClick(clickId);
           });
      }
      if(document.getElementById("rightEdit")){
          document.getElementById("rightEdit").addEventListener("click", function(){
            self.editClick(clickId);
           });
      }
      document.onclick = function(){
        document.getElementById("descDiv").style.display = "none";
      };
    }
    brandRightClick=(e)=>{
      let self=this;
      createRight(e);
      let clickId=e.event.target.getAttribute("name");
      this.props.dispatch({
         type: 'category/categroryRightClickKey',
         payload: {
            id:clickId,
         }
      });
      if(document.getElementById("rightAdd")){
          document.getElementById("rightAdd").addEventListener("click", function(){
            self.addBrandClick(clickId);
          });
      }
      if(document.getElementById("rightDelete")){
          document.getElementById("rightDelete").addEventListener("click", function(){
            self.deleteClick(clickId);
           });
      }
      if(document.getElementById("rightEdit")){
          document.getElementById("rightEdit").addEventListener("click", function(){
            self.editBrandClick(clickId);
           });
      }
      document.onclick = function(){
        document.getElementById("descDiv").style.display = "none";
      };
    }
    addClick(key){
      this.props.dispatch({
         type: 'category/showEditModelVisible',
         payload: {
            key:key,
            editModelType:'create'
         }
      });
    }
    editClick(key){
      this.props.dispatch({
         type: 'category/findCategoryById',
         payload: {
            id:key
         }
      });
    }
    addBrandClick(key){
      this.props.dispatch({
         type: 'brand/showEditModelVisible',
         payload: {
            key:key,
            editModelType:'create'
         }
      });
    }
    editBrandClick(key){
      this.props.dispatch({
         type: 'brand/findCategoryById',
         payload: {
            id:key
         }
      });
    }
    deleteClick(key){
      let self=this;
      Modal.confirm({
        title: '确定删除该类目?',
        content: '如果删除该类目，则该类目下的所有设备将不可见，请确定该目录下已无设备！',
        onOk() {
          self.props.dispatch({
           type: 'category/updateCategory',
           payload:{
            id:key,
            status:0
           }
          });
        },
        onCancel() {},
      });
    }
    showModal = ()=> {
      this.props.dispatch({
         type: 'category/showEditModelVisible',
         payload: {
            key:0,
            editModelType:'create'
         }
      });
    }
    showModalBrand = ()=> {
      this.props.dispatch({
         type: 'brand/showEditModelVisible',
         payload: {
            key:0,
            editModelType:'create'
         }
      });
    }
    render() {
      const loop1 = data => data.map((item,i) => {
	    if (item.children.length>0) {
          let title = (<div className="treeItem treeItemBackgrund1"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addClick(item.id)}/></div></div>);
	        return <TreeNode title={title} key={item.id}>{loop2(item.children)}</TreeNode>;
	      }
          let title = (<div className="treeItem treeItemBackgrund1"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="delete" onClick={()=>this.deleteClick(item.id)}/></div></div>);
	        return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
	    });
      const loop2 = data => data.map((item,i) => {
      if (item.children.length>0) {
          let title = (<div className="treeItem treeItemBackgrund2"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addClick(item.id)}/></div></div>);
          return <TreeNode title={title} key={item.id}>{loop3(item.children)}</TreeNode>;
        }
          let title = (<div className="treeItem treeItemBackgrund2"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="delete" onClick={()=>this.deleteClick(item.id)}/></div></div>);
          return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
      });
      const loop3 = data => data.map((item,i) => {
        let title = (<div className="treeItem treeItemBackgrund3"><div name={item.id} className="treeText">{item.name}</div><div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="delete" onClick={()=>this.deleteClick(item.id)}/></div></div>);
        return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
      });
      const loopBrand1 = data => data.map((item) => {
      if (item.children.length>0) {
          let title = (<div className="treeItem treeItemBackgrund1"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editBrandClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addBrandClick(item.id)}/>&emsp;</div></div>);
          return <TreeNode title={title} key={item.id}>{loopBrand2(item.children)}</TreeNode>;
        }
          let title = (<div className="treeItem treeItemBackgrund1"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editBrandClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addBrandClick(item.id)}/>&emsp;<span className="ant-divider" /></div></div>);
          return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
      });
      const loopBrand2 = data => data.map((item) => {
      if (item.children.length>0) {
          let title = (<div className="treeItem treeItemBackgrund2"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editBrandClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addBrandClick(item.id)}/></div></div>);
          return <TreeNode title={title} key={item.id}>{loopBrand3(item.children)}</TreeNode>;
        }
          let title = (<div className="treeItem treeItemBackgrund2"><div name={item.id} className="treeText">{item.name}</div>&emsp;<div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editBrandClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="plus-circle-o" onClick={()=>this.addBrandClick(item.id)}/>&emsp;<span className="ant-divider" /></div></div>);
          return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
      });
      const loopBrand3 = data => data.map((item) => {
          let title = (<div className="treeItem treeItemBackgrund3"><div name={item.id} className="treeText">{item.name}</div><div className="treeItemButtom"><Icon type="edit" onClick={()=>this.editBrandClick(item.id)}/>&emsp;<span className="ant-divider" />&emsp;<Icon type="delete" onClick={()=>this.deleteClick(item.id)}/></div></div>);
          return <TreeNode title={title} key={item.id} isLeaf={item.isLeaf} />;
      });
	    return (
            <div>
            <EditCategory {...this.props}/>
            <EditCategoryBrand {...this.props}/>
            <Row gutter={10}>
               <Col className="gutter-row" span={11}>
                    <Button type="primary" onClick={this.showModal}>添加一级类目</Button>
                    <Tree className="treeBox" onSelect={this.categoryOnSelect} expandedKeys={this.props.category.categoryExpandedKeys} onRightClick={this.categroryRightClick}>{loop1(this.props.category.categoryTree)}</Tree>
               </Col>
               <Col className="gutter-row" span={2}><div className="decollate"></div></Col>
               <Col className="gutter-row" span={11}>
                    <Button type="primary" onClick={this.showModalBrand}>添加品牌</Button>
                    <Tree className="treeBox" onSelect={this.brandOnSelect} expandedKeys={this.props.category.brandExpandedKeys} onRightClick={this.brandRightClick}>{loopBrand1(this.props.brand.categoryTree)}</Tree>
               </Col>
            </Row>
            </div>
	    );
    }
};

export default CategoryTree;
