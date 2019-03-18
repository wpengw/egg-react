import React, { Component } from 'react';
import './header.scss';
export default class Header extends Component {
  componentDidMount() {
    console.log('----Header componentDidMount-----');
  }

  render() {
    return (
      <header className="header">
        <div className="container"><h1>
          <a href="/" className="router-link-active">Egg</a></h1>
        </div>
      </header>
    );
  }
}
