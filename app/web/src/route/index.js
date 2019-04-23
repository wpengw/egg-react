import React, { Component } from 'react';
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin, Icon } from 'antd';

const createBrowserHistory = require('history').createBrowserHistory;
const history = createBrowserHistory();

const loadingComponent = ({ isLoading, error }) => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  if (isLoading) {
    return <Spin indicator={antIcon} style={{margin: 'auto', display: 'block'}} />
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
}

import Header from '../component/header/header.jsx';

const Home = Loadable({
  loader: () => import('../container/home'),
  loading: loadingComponent
})
const User = Loadable({
  loader: () => import('../container/user'),
  loading: loadingComponent
})
const Answer = Loadable({
  loader: () => import('../container/answer'),
  loading: loadingComponent
})
const TopicDetail = Loadable({
  loader: () => import('../container/topicDetail'),
  loading: loadingComponent
})
const CreateTopic = Loadable({
  loader: () => import('../container/createTopic'),
  loading: loadingComponent
})
const Targets = Loadable({
  loader: () => import('../container/targets'),
  loading: loadingComponent
})

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
  render() {
      return (
          <div>{this.props.children}</div>
      );
  }
}

// 登录验证
function requireAuth(Layout, props) {
  console.log(localStorage.getItem('id'))
  if (!localStorage.getItem('id')) { // 未登录
    return <Redirect to="/" />;
  } else {
    return <Layout {...props} />
  }
}

// let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { current: this.props.url };
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header current={this.state.current}></Header>
          <div className="mt30">
              <Switch>
                <Route path="/user/:id" component={ User }/>
                <Route path="/topicDetail/:id" component={ TopicDetail }/>
                <Route path="/answer" component={ Answer }/>
                <Route path="/create/topic" component={ props => requireAuth(CreateTopic, props) }/>
                <Route path="/targets" component={ Targets }/>
                <Route path="/" component={ Home }/>
                <Redirect from='' to="/" />
              </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
