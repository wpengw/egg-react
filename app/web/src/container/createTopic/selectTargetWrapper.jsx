import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as targetActions from '../../store/actions/target';
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

class SelectedTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      hadSelectedValue: []
    }
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleCheckTarget = this.handleCheckTarget.bind(this);
  }
  render() {
    let { targetList } = this.props;
    let { active, hadSelectedValue } = this.state;
    let targetChildList = [];
    if (targetList.length > 0) {
      targetChildList = targetList[active].targets;
    }
    
    return(
      <div className="select-wrapper" id="selectWrapper">
        <span className="close" onClick={ this.props.handleClose }>×</span>
        <ul className='target-tab clear'>
          {
            targetList.map((item, index) => {
              return <li key={item.value}>
                <a 
                  className={ active == index ? 'active' : null } 
                  onClick={ () => this.handleChangeTab(index) }
                >{ item.label }</a>
              </li>
            })
          }
        </ul>
        <ul className='tab-content clear'>
          {
            targetChildList.map((item, index) => {
              return <li key={item.value}>
                <a
                  className={ hadSelectedValue.indexOf(item.value) >= 0 ? 'active' : null }
                  onClick={ () => this.handleCheckTarget(item) }
                >{ item.label }</a>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.handleGetTargets();
  }
  componentDidUpdate() {
   
  }
  handleGetTargets() {
    this.props.getTargets();
  }
  handleChangeTab(index) {
    this.setState({
      active: index
    })
  }
  handleCheckTarget(item) {
    const topicType = this.props.targetList[this.state.active].value;
    this.props.handleCheckTarget(item.label, item.value, topicType)
  }
}

SelectedTarget.propTypes = {
  targetList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const { target } = state;
  return {
    targetList: target.targetList
  }
}

const mapDispatchToProps = (dispatch) => {
  const getTargets = targetActions.getTargetList.request;
  return bindActionCreators({ getTargets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTarget);
