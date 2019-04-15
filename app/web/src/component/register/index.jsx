import React, { Component } from 'react';
import './register.scss';
import { postRegister } from '../../../api/user';
import { message } from 'antd';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handelChangeName = this.handelChangeName.bind(this);
    this.handelChangeEmail = this.handelChangeEmail.bind(this);
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
            <h4 className="modal-title">注册</h4>
            <button type="button" className="close" onClick={ this.props.handleHide }>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="login-wrapper">
              <div className="from-group">
                <label>你的名字</label>
                <input type="text" onChange={ e => this.handelChangeName(e) } placeholder="真实姓名或常用昵称"/>
              </div>
              <div className="from-group">
                <label>邮箱</label>
                <input type="text" onChange={ e => this.handelChangeEmail(e) } placeholder="正确的邮箱"/>
              </div>
              <div className="from-group">
                <label>密码</label>
                <input type="password" onChange={ e => this.handelChangePwd(e) } placeholder="不少于六位"/>
              </div>
              <div className="from-group">
                <button className="btn btn-primary width100" onClick={ this.handleSubmit }>注册</button>
                <button className="btn btn-default width100">已有账号登录</button>
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
  handelChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handelChangePwd(e) {
    this.setState({
      password: e.target.value
    })
  }
  async handleSubmit() {
    // let _state = this.state;
    // const params = {
    //   username: _state.username,
    //   email: _state.email,
    //   password: _state.password
    // }
    // this.props.postRegister(params);
    try {
      let _state = this.state;
      const params = {
        username: _state.username,
        email: _state.email,
        password: _state.password
      }
      const res = await postRegister(params);
      if (res.code == 0) {
        this.props.handleHide();
        message.success(res.msg, 2);
      } else {
        message.error(res.msg, 2);
      }
    } catch (err) {
      console.log('register', err);
    }
  }
}

export default Register;

