import React, { Component, PropTypes } from 'react';

// 引入 connect 工具函数
import { connect } from 'dva';

// Users 的 Presentational Component
import Login from '../components/login/Login';

function LoginPage({ location, dispatch, login }) {

    const loginProps = {
        login, 
        dispatch,
    };
    return ( 
      <Login {...loginProps}/>
    );
}

LoginPage.propTypes = {
    login: PropTypes.object,
};

// 指定订阅数据，这里关联了 users
function mapStateToProps({ login }) {
    return { login };
}

// 建立数据关联关系
export default connect(mapStateToProps)(LoginPage);
