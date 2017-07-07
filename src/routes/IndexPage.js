import React, { Component, PropTypes } from 'react';

// 引入 connect 工具函数
import { connect } from 'dva';

// Users 的 Presentational Component
import Layout from '../components/Layout';

function IndexPage({ location, children, dispatch, login, product, category,banner ,requirement,provider,brand,user}) {
   
    const layoutProps = {
        login, 
        location,
        product, 
        category,
        banner,
        requirement,
        provider,
        brand,
        user,
        dispatch,
        children
    };
    
    return ( 
      <Layout {...layoutProps }/>
    );
}

IndexPage.propTypes = {
    login: PropTypes.object,
    product: PropTypes.object,
    category: PropTypes.object,
    banner:PropTypes.object,
    requirement:PropTypes.object,
    provider:PropTypes.object,
    brand:PropTypes.object,
    user:PropTypes.object
};

// 指定订阅数据
function mapStateToProps({ login, product, category,banner ,requirement,provider,brand,user}) {
    return { login, product, category ,banner,requirement,provider,brand,user};
}

// 建立数据关联关系
export default connect(mapStateToProps)(IndexPage);
