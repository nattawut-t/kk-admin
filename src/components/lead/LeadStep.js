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
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
        >
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              ข้อตกลงและเงื่อนไข
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              ข้อมูลส่วนตัว
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              ความต้องการกู้
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              ข้อมูลเพิ่มเติมเพื่อการกู้
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              ส่งคำขอกู้
            </StepButton>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default LeadStep;
