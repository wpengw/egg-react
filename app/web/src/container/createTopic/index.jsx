import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as topicActions from '../../store/actions/topic';
import Editor from 'for-editor'
import './style.scss';
import { Input, Select } from 'antd';
import { message } from 'antd';

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
      title: '',
      topicType: 1,
      targets: '1,2,3,4,5',
      content: ''
    }
    this.handleSave = this.handleSave.bind(this);
  }
  render() {
    const { content, title } = this.state
    return(
      <div className="create-wrapper">
        <Input size="large" value={title} onChange={ this.handleChangeTitle.bind(this) } addonBefore={selectBefore} defaultValue="mysite" />
        <div className="target-wapper">
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <span className="target-item">javascript <span className="remove">×</span></span>
          <input type="text" className="target-ipt" placeholder="标签，如：js（用逗号,分号;分隔）"/>
        </div>

        <Editor value={content} onChange={ this.handleChangeContent.bind(this) } />
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
  handleChangeContent(content) {
    this.setState({
      content
    })
  }
  handleSave() {
    const _st = this.state;
    console.log(_st);
    const params = {
      authorId: this.props.loginInfo.id,
      authorName: this.props.loginInfo.username,
      title: _st.title,
      topicType: _st.topicType,
      targets: _st.targets,
      content: _st.content
    }
    this.props.postCreateTopic(params);
  }
}

// CreateTopic.propTypes = {
//   // detail: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => {
  console.log(state);
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
