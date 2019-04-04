import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as topicActions from '../../store/actions/topic';
import { unique } from '../../../util/tool'
import Editor from 'for-editor'
import SelectTargetWrapper from './selectTargetWrapper';
import './style.scss';
import { Input, Select } from 'antd';
import { message } from 'antd';
import { isNumber } from 'util';

const Option = Select.Option;

const selectBefore = (
  <Select defaultValue="1" style={{ width: 80 }}>
    <Option value="1">原创</Option>
    <Option value="2">转载</Option>
    <Option value="3">翻译</Option>
  </Select>
);

class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      warnIndex: null,
      title: '',
      topicType: 1,
      targets: '',
      content: '',
      targetArr: []
    }
    
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCheckTarget = this.handleCheckTarget.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  render() {
    const { content, title, targetArr, focused, warnIndex } = this.state;
    return(
      <div className="create-wrapper">
        <Input size="large" value={title} onChange={ this.handleChangeTitle } addonBefore={selectBefore} defaultValue="mysite" />
        <div className="target-wrapper">
          {
            targetArr.map((item, index) => {
              return <span className={index == warnIndex ? 'warning target-item' : 'target-item'} key={item.value}>{ item.label } <span className="remove" onClick={ () => this.handleRemove(item.value) }>×</span></span>
            })
          }
          <div className="ipt-wrapper">
            <input 
              type="text" 
              className="target-ipt" 
              placeholder="标签，如：js（用逗号,分号;分隔）"
              onFocus={ this.handleFocus }
            />
            {
              focused ? <SelectTargetWrapper handleCheckTarget={ this.handleCheckTarget } handleClose={ this.handleClose.bind(this) } /> : null
            }
          </div>
        </div>
        <div onClick={ this.handleClose.bind(this) }>
          <Editor value={content} onChange={ this.handleChangeContent.bind(this) } />
        </div>
        <div className="create-footer">
          <button className="btn btn-primary fr" onClick={ this.handleSave }>发布文章</button>
        </div>
      </div>
    )
  }
  componentDidMount() {
    
  }
  componentDidUpdate() {
    if (this.props.created) {
      message.success('创建成功！');
      this.props.history.push('/');
    }
  }
  handleChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleCheckTarget(label, value, topicType) {
    const _obj = { label, value };
    let _index = null;
    let _arr = this.state.targetArr;
    this.state.targetArr.forEach((item, index) => {
      if (item.value == value) {
        _index = index;
      }
    })
    if (isNumber(_index)) {
      this.setState({
        warnIndex: _index
      })
      setTimeout(() => {
        this.setState({
          warnIndex: null
        })
      }, 1000)
    } else {
      _arr = this.state.targetArr.concat([_obj]);
    }

    if (_arr.length >= 4) {
      _arr = _arr.splice(0, 4);
    }
    
    this.setState({
      targetArr: _arr,
      topicType
    })
  }
  handleRemove(value) {
    let _arr = this.state.targetArr.filter(item => {
      return item.value != value;
    })
    this.setState({
      targetArr: _arr
    })
  }
  handleChangeContent(content) {
    this.setState({
      content
    })
  }
  handleFocus() {
    this.setState({
      focused: true
    })
  }
  handleClose() {
    this.setState({
      focused: false
    })
  }
  handleSave() {
    const _st = this.state;
    let _targets = _st.targetArr.map(item => {
      return item.value
    })
    _targets = _targets.join(',');
    const params = {
      authorId: this.props.loginInfo.id,
      authorName: this.props.loginInfo.username,
      title: _st.title,
      topicType: _st.topicType,
      targets: _targets,
      content: _st.content
    }
    this.props.postCreateTopic(params);
  }
}

CreateTopic.propTypes = {
  loginInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { topic, user } = state;
  if (topic.msg) {
    message.error(topic.msg);
    return;
  }
  return {
    loginInfo: user.loginInfo,
    created: topic.created
  }
}

const mapDispatchToProps = (dispatch) => {
  const postCreateTopic = topicActions.postCreateTopic.request;
  return bindActionCreators({ postCreateTopic }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);
