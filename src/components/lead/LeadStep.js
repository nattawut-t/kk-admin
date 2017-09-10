import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
  // StepContent,
} from 'material-ui/Stepper';

class LeadStep extends Component {

  state = {
    stepIndex: 0,
  };

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
        <Stepper
          activeStep={stepIndex}
          linear={false}
        >
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              <div className="step-text">ข้อตกลงและเงื่อนไข</div>
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              <div className="step-text">ข้อมูลส่วนตัว</div>
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              <div className="step-text">ความต้องการกู้</div>
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              <div className="step-text">ข้อมูลเพิ่มเติมเพื่อการกู้</div>
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              <div className="step-text">ส่งคำขอกู้</div>
            </StepButton>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default LeadStep;
