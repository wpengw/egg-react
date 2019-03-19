import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './header.scss';
export default class Header extends Component {
  componentDidMount() {
    console.log('----Header componentDidMount-----');
  }

  render() {
    return (
      <header className="header">
        <nav className="container">
          <div className="row">
            <div className="logo pull-left">Logo </div>
            <div className="linkList pull-left">
              <Link to="/">首页</Link>
              <Link to="/about">问答</Link>
              <Link to="/test">test</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
