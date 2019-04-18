import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as topicActions from '../../store/actions/topic';
import './style.scss';
import { message } from 'antd';
import { isNumber } from 'util';

class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      warnIndex: null,
      title: '',
      topicType: 1,
      parentTarget: '',
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
      <div className="targets">
        <h2>标签</h2>
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
  handleCheckTarget(label, value, parentTarget) {
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
      parentTarget
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
      topicType: _st.topicType,
      title: _st.title,
      parentTarget: _st.parentTarget,
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
