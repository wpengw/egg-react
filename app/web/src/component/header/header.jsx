import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({
      current: location.href.split('/').pop()
    })
  }
  render() {
    const {current} = this.state;
    return (
      <header className="header">
        <nav className="container">
          <div className="row">
            <div className="logo fl">Logo </div>
            <div className="linkList fl">
              <Link to="/" onClick={() => this.handleClick('')} className={current == '' ? 'active' : null}>首页</Link>
              <Link to="/answer" onClick={() => this.handleClick('answer')} className={current == 'answer' ? 'active' : null}>问答</Link>
              <Link to="/test" onClick={() => this.handleClick('test')} className={current == 'test' ? 'active' : null}>test</Link>
            </div>
            <div className="fr">
              <button className="btn btn-default" to="/" onClick={() => this.handleClick()} >立即登录</button>
              <button className="btn btn-primary ml20" to="/" onClick={() => this.handleClick()} >免费注册</button>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  handleClick(current) {
    this.setState({
      current
    });
  }
}
