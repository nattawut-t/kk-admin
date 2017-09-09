import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

// import PrefixEn from '../shared/PrefixEn';
const styles = {
  button: {
    margin: 12,
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
};

class Agreement extends Component {
  state = {
    isConsent: false,
  };

  // validate = () => {
  //   const { prefixTH } = this.state;
  //   console.log('>>> prefixTH: ', prefixTH);

  //   const keys = [
  //     'isConsent',
  //   ];

  //   const invalid = keys
  //     .map(key => ({
  //       key,
  //       value: this.state[key],
  //     }))
  //     .find(({ key, value }) => {
  //       console.log('>>> validate.find: ', key, value);
  //       return !value;
  //     });

  //   console.log('>>> invalid: ', invalid);

  //   return !invalid;
  // }

  handleChange = () => {
    const { isConsent } = this.state;
    this.setState({ isConsent: !isConsent });
  };

  handleNext = () => {
    const { history } = this.props;
    history.push('/personal-info');
  };

  render() {
    const {
      isConsent,
      // valid,
    } = this.state;

    return (
      <div>
        <Card>
          <CardTitle>เงื่อนไขและข้อตกลง</CardTitle>
          <CardText>
            <div className="row">
              <div className="col">
                <p style={{ textAlign: 'justify' }}>
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
            <div className="row">
              <div className="col">
                <Checkbox
                  label="ฉันยินยอมข้อตกลงและเงื่อนไขการใช้บริการ"
                  checked={isConsent}
                  disabled={false}
                  style={styles.checkbox}
                  onCheck={this.handleChange}
                />
              </div>
              <div className="col" style={{ textAlign: 'right' }}>
                <RaisedButton
                  label="ตกลง"
                  labelPosition="before"
                  primary
                  style={styles.button}
                  disabled={!isConsent}
                  icon={<FontIcon className="muidocs-icon-custom-github" />}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

Agreement.propTypes = {
  // loading: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

// Agreement.defaultProps = {
//   loading: false,
// };

export default withRouter(Agreement);
