import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './login.scss';
// import { postLogin } from '../../../api/user';
// import { sendLoginRequest } from '../../actions/user'
import * as userActions from '../../store/actions/user';
import { message } from 'antd';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handelChangeName = this.handelChangeName.bind(this);
    this.handelChangePwd = this.handelChangePwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="modal-full-page register">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">登录</h4>
            <button type="button" className="close" onClick={ this.props.handleHide }>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="login-wrapper">
              <div className="from-group">
                <label>用户名 或 Email</label>
                <input type="text" onChange={ e => this.handelChangeName(e) } placeholder="真实姓名或常用昵称"/>
              </div>
              <div className="from-group">
                <label>密码</label>
                <input type="password" onChange={ e => this.handelChangePwd(e) } placeholder="不少于六位"/>
              </div>
              <div className="from-group">
                <button className="btn btn-primary width100" onClick={ this.handleSubmit }>登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handelChangeName(e) {
    this.setState({
      username: e.target.value
    })
  }
  handelChangePwd(e) {
    this.setState({
      password: e.target.value
    })
  }
  async handleSubmit() {
    // const { dispatch } = this.props;
    let _state = this.state;
    const params = {
      username: _state.username,
      password: _state.password
    }
    this.props.postLogin(params);
  }
}


const mapStateToProps = (state, props) => {
  const { loginInfo } = state.user;
  return {
    loginInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  const postLogin = userActions.postLogin.request;
  return bindActionCreators({ postLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
