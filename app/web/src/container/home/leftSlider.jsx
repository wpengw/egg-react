import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LeftSlider extends Component {
  render() {
    return (
      <div className="leftSlider">
        <div className="tech-square">
          <ul>
            <li className="tech-square-item">
              <Link to="">
                <span className="tech-square-item-icon">
                  <img src="https://avatar-static.segmentfault.com/399/739/3997397795-5a6edc1c3167f_small" alt=""/>
                </span>
                <span>前端</span>
              </Link>
              <div className="hoverShow">
                iiid
              </div>
            </li>
            <li className="tech-square-item">
              <Link to="">
                <span className="tech-square-item-icon">
                  <img src="https://avatar-static.segmentfault.com/199/890/1998904068-5a6edc3e40de1_small" alt=""/>
                </span>
                <span>后端</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  // console.log('mapStateToProps', state);
  return {
    list: state.list
  };
};

export default connect(mapStateToProps, null)(LeftSlider);
