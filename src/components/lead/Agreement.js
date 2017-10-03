import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

import CardFooter from '../shared/CardFooter';

const styles = {
  raisedButton: {
    margin: 0,
  },
  buttonStyle: {
    minWidth: '157px',
    height: '40px',
    borderRadius: '3px',
    padding: '0px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
  },
  overlayStyle: {
    height: '40px',
    borderRadius: '3px',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  checkbox: {
    top: '8px',
  },
  cardTitle: {
    fontFamily: '"Kanit", sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.6px',
    color: '#4a4a4a',
    padding: '16px 16px 0',
  },
};

class Agreement extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
    console.log('agree.componentWillMount');
    const { getDraft } = this.props;
    getDraft();
  }

  componentDidMount() {
    const { data } = this.props;

    console.log('agree.componentDidMount', data);

    this.setState(data);
  }

  handleChange = () => {
    const { isConsent } = this.state;
    this.setState({ isConsent: !isConsent });
  };

  handleNextClick = () => {
    const { isConsent } = this.state;
    const { saveDraft, history } = this.props;
    saveDraft({ isConsent }, () => history.push('/identity-info'));
  };

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

    const { isConsent } = this.state;
    const { message } = this.props;

    console.log('agree.render: ', isConsent);

    return (
      <div>
        <Card>
          <CardTitle style={styles.cardTitle}>เงื่อนไขและข้อตกลง</CardTitle>
          <CardText>
            <div className="row">
              <div className="col">
                <p style={{ color: '#505050' }}>
                  “ข้าพเจ้าตกลงและยินยอมให้ธนาคารเกียรตินาคิน จำกัด
                  (มหาชน) (“ธนาคาร”) เข้าถึงและใช้ข้อมูลส่วนบุคคล ข้อมูลทางการเงิน
                  ข้อมูลเครดิต และข้อมูลส่วนตัวใดๆ ของข้าพเจ้าที่อยู่ในระบบของบริษัท
                  มันนี่เทเบิล จำกัด (มหาชน) (“มันนี่เทเบิล”) เพื่อประโยชน์ในการพิจารณา
                  วิเคราะห์ และอนุมัติสินเชื่อของธนาคาร รวมถึงการสมัครบริการอื่นๆ
                  ของธนาคารที่เกี่ยวข้อง ข้าพเจ้ารับทราบว่าระบบของมันนี่เทเบิลเป็นเพียงช่องทาง
                  อำนวยความสะดวกในการรับ
                  ส่งข้อมูล และเอกสารการขอสินเชื่อของข้าพเจ้าต่อธนาคารเท่านั้น
                  มันนี่เทเบิลไม่มีส่วนร่วมในการพิจารณาอนุมัติสินเชื่อของธนาคารแต่อย่างใด
                  ธนาคารขอสงวนสิทธิ์ในการอนุมัติหรือปฏิเสธคำขอสินเชื่อนี้
                  รวมถึงการปรับเปลี่ยนวงเงินสินเชื่อและระยะเวลาผ่อนชำระคืนตามที่ระบุในใบคำขอสินเชื่อ
                  โดยวงเงินสินเชื่อและระยะเวลาผ่อนชำระคืนที่ธนาคารจะพิจารณาอนุมัติ
                  ขึ้นอยู่กับคุณสมบัติของผู้ขอสินเชื่อและหลักเกณฑ์การพิจารณาของธนาคาร”
                  </p>
              </div>
            </div>
          </CardText>
        </Card>
        <CardFooter>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <Checkbox
                  id="isConsent"
                  name="isConsent"
                  label="ฉันยินยอมข้อตกลงและเงื่อนไขการใช้บริการ"
                  checked={isConsent}
                  disabled={false}
                  style={styles.checkbox}
                  onCheck={this.handleChange}
                />
              </div>
            </div>
            <div className="col-sm-6" style={{ textAlign: 'right' }}>
              <RaisedButton
                id="next-button"
                name="next-button"
                label="ดำเนินการต่อ"
                labelPosition="before"
                overlayStyle={styles.overlayStyle}
                primary
                style={styles.raisedButton}
                disabled={!isConsent}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
                onClick={this.handleNextClick}
                buttonStyle={styles.buttonStyle}
              />
            </div>
          </div>
        </CardFooter>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

Agreement.propTypes = {
  message: PropTypes.string,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  // editing: PropTypes.bool.isRequired,
  getDraft: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
};

Agreement.defaultProps = {
  message: '',
};

export default withRouter(Agreement);
