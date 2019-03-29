import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './header.scss';
import Register from '../register';
import Login from '../login';
import { message } from 'antd';
import * as userActions from '../../store/actions/user';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      isShowLogin: false,
      isShowRegister: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleHideRegister = this.handleHideRegister.bind(this);
    this.handleHideLogin = this.handleHideLogin.bind(this);
    this.handleClickOut = this.handleClickOut.bind(this);
  }
  componentDidMount() {
    this.setState({
      current: location.href.split('/').pop()
    })
  }
  render() {
    const { current, isShowLogin, isShowRegister } = this.state;
    const { loginInfo, msg } = this.props;
    return (
      <header className="header">
        <nav className="container">
          <div className="row clear">
            <Link to="/" className="logo fl">Logo </Link>
            <div className="linkList fl">
              <Link to="/" onClick={() => this.handleClick('')} className={current == '' ? 'active' : null}>首页</Link>
              <Link to="/answer" onClick={() => this.handleClick('answer')} className={current == 'answer' ? 'active' : null}>问答</Link>
            </div>
            <div className="fr">
              {
                loginInfo.username ? 
                  (
                    <div>
                      <button className="btn  btn-default create">
                        创建
                        <ul className="hoverShow">
                          <li><a href="/create/topic">写文章</a></li>
                          <li><a href="">记笔记</a></li>
                        </ul>
                      </button>
                      <button className="btn btn-default" onClick={() => this.handleClickOut()} >退出</button>
                    </div>
                  ): 
                  (
                    <div>
                      <button className="btn btn-default" onClick={() => this.handleClickLogin()} >立即登录</button>
                      <button className="btn btn-primary ml20" onClick={() => this.handleClickRegister()} >免费注册</button>
                    </div>
                  )
              }
            </div>
          </div>
        </nav>
        {
          isShowRegister ? <Register handleHide={ this.handleHideRegister } /> : null
        }
        {
          isShowLogin && !loginInfo.username ? <Login handleHide={ this.handleHideLogin }  /> : null
        }
      </header>
    );
  }

  handleClick(current) {
    this.setState({
      current
    });
  }
  handleClickLogin() {
    this.setState({
      isShowLogin: true
    })
  }
  handleClickRegister() {
    this.setState({
      isShowRegister: true
    })
  }
  handleHideRegister() {
    this.setState({
      isShowRegister: false
    })
  }
  handleHideLogin() {
    this.setState({
      isShowLogin: false
    })
  }
  handleClickOut() {
    this.props.postLoginOut();
  }
}

const mapStateToProps = (state) => {
  const { loginInfo, msg } = state.user;
  if (msg) {
    message.error(msg);
  }
  return {
    loginInfo,
    msg
  }
}

const mapDispatchToProps = (dispatch) => {
  const postLoginOut = userActions.postLoginOut.request;
  return bindActionCreators({ postLoginOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);