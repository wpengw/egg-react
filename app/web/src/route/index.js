import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../component/header/header.jsx';
import Home from '../container/home';
import User from '../container/user';
import Answer from '../container/answer';
import TopicDetail from '../container/topicDetail';
import CreateTopic from '../container/createTopic';
import Targets from '../container/targets';

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
      <BrowserRouter>
        <div>
          <Header current={this.state.current}></Header>
          <div className="mt30">
            <Switch>
              <Route path="/user/:id" component={ User }/>
              <Route path="/topicDetail/:id" component={ TopicDetail }/>
              <Route path="/answer" component={ Answer }/>
              <Route path="/create/topic" component={ CreateTopic }/>
              <Route path="/targets" component={ Targets }/>
              <Route path="/" component={ Home }/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
