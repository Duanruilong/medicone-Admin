import React from 'react';
import { Router, Route ,IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage';
import Banner from './components/banner/Banner';
import CategoryTree from './components/product/CategoryTree';
import ProductList from './components/product/ProductList';
import EditProduct from './components/product/EditProduct';
import RequirementList from './components/requirement/RequirementList';
import ProviderList from './components/provider/ProviderList';
import EditProvider from './components/provider/EditProvider';
import Hot from './components/hot/Hot';
import Partner from './components/partner/Partner';
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';
import Systems from './components/system/System';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={IndexPage}>
        <IndexRedirect to="/category" />
      	<Route path="/banner" component={Banner} />
      	<Route path="/category" component={CategoryTree} />
      	<Route path="/product" component={ProductList} />
        <Route path="/product/edit" component={EditProduct} />
        <Route path="/requirement" component={RequirementList} />
        <Route path="/provider" component={ProviderList} />
        <Route path="/provider/edit" component={EditProvider} />
        <Route path="/hot" component={Hot} />
        <Route path="/partner" component={Partner} />
        <Route path="/user" component={UserList} />
        <Route path="/user/detail" component={UserDetail} />
        <Route path="/tag" component={Systems} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
