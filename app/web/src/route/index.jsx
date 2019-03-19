import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from '../component/header/header.jsx';
import Home from '../container/home';
import User from '../container/user';
import About from '../container/about';
import Test from '../container/test';

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
    return <BrowserRouter>
      <div>
        <Header></Header>
        <div className="container mt30">
          <Switch>
            <Route path="/user/:id" component={User}/>
            <Route path="/about" component={About}/>
            <Route path="/test" component={Test}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>;
  }
}

export default App;
