import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './header.scss';
import Register from '../register';
import Login from '../login';
import { sendLoginOut } from '../../actions/user'

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
    const { loginInfo } = this.props;
    console.log(loginInfo);
    return (
      <header className="header">
        <nav className="container">
          <div className="row clear">
            <div className="logo fl">Logo </div>
            <div className="linkList fl">
              <Link to="/" onClick={() => this.handleClick('')} className={current == '' ? 'active' : null}>首页</Link>
              <Link to="/answer" onClick={() => this.handleClick('answer')} className={current == 'answer' ? 'active' : null}>问答</Link>
            </div>
            <div className="fr">
              {
                loginInfo.username ? 
                  (
                    <div >
                      <span>{ loginInfo.username }</span>
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
          isShowLogin ? <Login handleHide={ this.handleHideLogin }  /> : null
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
    const { dispatch }=this.props;
    dispatch(sendLoginOut());
  }
}

const mapStateToProps = (state) => {
  const { loginInfo } = state.userInfo;
  return {
    loginInfo: loginInfo || {}
  }
}

export default connect(mapStateToProps)(Header);