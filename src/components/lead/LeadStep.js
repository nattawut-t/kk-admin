import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import {
  Step,
  Stepper,
} from 'material-ui/Stepper';

import IconCheckmark from '../../../assets/icon-checkmark.png';

const ConnectorLine = styled.div`
  display: block;
  border-color: rgb(189,189,189);
  border-top-style: solid;
  border-top-width: 1px;
  width: 30px;
  margin: 0 16px 0 11px;
  @media screen and (max-width: 1170px){
    width: 10px;
  }
  @media screen and (max-width: 375px){
    margin: 0 13px 0 9px;
  }
`;

class LeadStep extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    stepIndex: 0,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps) {
      switch (location.pathname) {
        case '/borrow-request':
          this.setState({ stepIndex: 0 });
          break;

        case '/personal-info':
          this.setState({ stepIndex: 1 });
          break;

        case '/loan-info':
          this.setState({ stepIndex: 2 });
          break;

        case '/additional-info':
          this.setState({ stepIndex: 3 });
          break;

        case '/summary':
          this.setState({ stepIndex: 4 });
          break;

        default: this.setState({ stepIndex: 0 });
      }
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions = () => <div />;

  render() {
    const { stepIndex } = this.state;
    return (
      <div className="stepper">
        <div className="stepper--container">
          <Stepper
            activeStep={stepIndex}
            linear={false}
            connector={<ConnectorLine />}
          >
            <Step>
              <div className={stepIndex === 0 ? 'stepper--active' : null}>
                <div className="stepper--control">
                  <span className="stepper--number">
                    <div className="stepper--number--icon" style={stepIndex === 1 ? { backgroundColor: '#019bc9' } : null} >
                      {stepIndex === 1 ? <img src={IconCheckmark} alt="Step checked" /> : 1}
                    </div>
                  </span>
                  <span className="stepper--text">ข้อมูลส่วนตัว</span>
                </div>
              </div>
            </Step>
            <Step>
              <div className={stepIndex === 1 ? 'stepper--active' : null}>
                <div className="stepper--control">
                  <span className="stepper--number">
                    <div className="stepper--number--icon" style={stepIndex === 2 ? { backgroundColor: '#019bc9' } : null} >
                      {stepIndex === 2 ? <img src={IconCheckmark} alt="Step checked" /> : 2}
                    </div>
                  </span>
                  <span className="stepper--text">ความต้องการกู้</span>
                </div>
              </div>
            </Step>
            <Step>
              <div className={stepIndex === 2 ? 'stepper--active' : null}>
                <div className="stepper--control">
                  <span className="stepper--number">
                    <div className="stepper--number--icon" style={stepIndex === 3 ? { backgroundColor: '#019bc9' } : null} >
                      {stepIndex === 3 ? <img src={IconCheckmark} alt="Step checked" /> : 3}
                    </div>
                  </span>
                  <span className="stepper--text">ข้อมูลเพิ่มเติมเพื่อการกู้</span>
                </div>
              </div>
            </Step>
            <Step>
              <div className={stepIndex === 3 ? 'stepper--active' : null}>
                <div className="stepper--control">
                  <span className="stepper--number">
                    <div className="stepper--number--icon" style={stepIndex === 4 ? { backgroundColor: '#019bc9' } : null} >
                      {stepIndex === 4 ? <img src={IconCheckmark} alt="Step checked" /> : 4}
                    </div>
                  </span>
                  <span className="stepper--text">ส่งคำขอกู้</span>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    );
  }
}

export default withRouter(LeadStep);
