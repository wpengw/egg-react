import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as targetActions from '../../store/actions/target';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LeftSlider extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { targetList } = this.props;
    return (
      <div className="leftSlider">
        <div className="tech-square">
          <ul>
            {
              targetList.map(item => {
                return <li className="tech-square-item" key={ item.value }>
                  <a onClick={ () => this.props.handleSelectByTopicType(item.value) }>
                    <span className="tech-square-item-icon">
                      <img src={ item.iconUrl } alt=""/>
                    </span>
                    <span>{ item.label }</span>
                  </a>
                  {
                    item.targets.length > 0 ?
                      <div className="hoverShow">
                        <ul>
                          {
                            item.targets.map(elt => {
                              return <li key={ elt.value }><a onClick={ () => this.props.handleSelectByTarget(elt.value) }>{ elt.label }</a></li>
                            })
                          }
                        </ul>
                      </div> :
                      null
                  }
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getTargets();
  }
  // handleSelect(value) {
  //   this.props.handleSelectByTarget(value);
  // }
}

LeftSlider.propTypes = {
  targetList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  // console.log(state);
  const { target } = state;
  return {
    targetList: target.targetList
  }
}

const mapDispatchToProps = (dispatch) => {
  const getTargets = targetActions.getTargetList.request;
  return bindActionCreators({ getTargets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSlider);
