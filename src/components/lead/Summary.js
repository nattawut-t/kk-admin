import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  button: {
    margin: 12,
  },
  input: {
    width: '100%',
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
  marginBottom: {
    marginBottom: '20px',
  },
  sectionTitle: {
    backgroundColor: 'rgb(0, 188, 212)',
  },
  TitleText: {
    color: 'white',
  },
};

class Summary extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  };

  state = {
    isConsent: false,
  };

  handleChange = () => {
    const { isConsent } = this.state;
    this.setState({ isConsent: !isConsent });
  };

  handleBack = () => {
    const { history } = this.props;
    history.push('/additional-info');
  };

  handleNext = e => {
    e.preventDefault();
    const { save } = this.props;
    save();
    // history.push('/');
  };

  render() {
    const { isConsent } = this.state;

    return (
      <div>
        <form>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="Disclaimer"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <figure className="highlight no-margin">
                ภายหลังส่งคำขอนุมัติสินเชื่อผ่านระบบมันนี่เทเบิล
                ผู้ใช้บริการสามารถเช็คสถานะการอนุมัติเอกสาร
                หลักฐาน รวมถึงแต่ไม่จำกัดเฉพาะข้อมูลทางการเงินต่างๆ
                ที่ผู้ใช้บริการกรอกข้อมูลทั้งนี้สถานะดังกล่าวมันนี่เทเบิล
                จะพยายามอย่างดีที่สุดในการปรับปรุงสถานะของผู้ใช้บริการให้เป็นปัจจุบัน
                &quot;ข้าพเจ้ารับทราบและเข้าใจข้อมูล เงื่อนไขผลิตภัณฑ์สินเชื่อ
                และประสงค์จะขอสินเชื่อกับธนาคารเกียรตินาคิน จำกัด (มหาชน)
                ทั้งนี้ <br />
                &nbsp;&nbsp;&nbsp;ข้าพเจ้าได้ตรวจสอบความถูกต้องของข้อมูลในเอกสารประกอบการ
                ขอสินเชื่อที่แนบมาทั้งหมดนี้แล้ว
                และขอรับรองว่าข้อมูลทั้งหมดในเอกสารดังกล่าวเป็นจริง
                ถูกต้อง และเป็นปัจจุบันในทุกประการ&quot;
              </figure>
            </CardText>
          </Card>

          <div className="row">
            <div className="col">
              <span className="important">กรุณาตรวจสอบความถูกต้องข้อมูลก่อนส่งคำขอกู้</span>
            </div>
          </div>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ความต้องการกู้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    value="test"
                    floatingLabelText="จำนวนเงินที่ต้องการกู้"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    value="test"
                    floatingLabelText="ระยะเวลาผ่อนชำระ (งวด)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลเพิ่มเติม"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    value="test"
                    floatingLabelText="รวมภาระหนี้ (บ้าน + รถ + สินเชื่อส่วนบุคคล)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    value="test"
                    floatingLabelText="ยอดหนี้บัตรเครดิตคงค้างเดือนล่าสุด"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label htmlFor="beneficiary">ผู้ได้รับผลประโยชน์ที่แท้จริง</label>
                </div>
                <div className="col-3">
                  <RadioButtonGroup
                    name="beneficiary"
                    readOnly
                  >
                    <RadioButton
                      value="myself"
                      label="ตนเอง"
                    />
                    <RadioButton
                      value="others"
                      label="ผู้อื่น(โปรดระบุ)"
                    />
                  </RadioButtonGroup>
                </div>
                <div className="col-6">
                  <TextField
                    id="loanBeneficiaryName"
                    name="loanBeneficiaryName"
                    floatingLabelText="ผู้รับผลประโยชน์ที่แท้จริง"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ประวัติการชำระหนี้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-8">
                  <label htmlFor="paymentHistoryExists">มีประวัติการชำระหนี้ใน 12 เดือน</label>
                </div>
                <div className="col-4">
                  <div className="row" style={{ marginBottom: '0' }}>
                    <RadioButtonGroup
                      name="paymentHistoryExists"
                      id="paymentHistoryExists"
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                      <RadioButton
                        value="0"
                        label="ไม่มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <label htmlFor="pLoanApplicationHositoryExists">มีประวัติการสมัครสินเชื่อส่วนบุคคล</label>
                </div>
                <div className="col-4">
                  <div className="row" style={{ marginBottom: '0' }}>
                    <RadioButtonGroup
                      name="pLoanApplicationHositoryExists"
                      id="pLoanApplicationHositoryExists"
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                      <RadioButton
                        value="0"
                        label="ไม่มี"
                        style={{ display: 'inline-block', width: '50%' }}
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <label htmlFor="pLoanApplicationHositoryExists">มีประวัติการสมัครสินเชื่อส่วนบุคคล</label>
                </div>
                <div className="col-4">
                  <div className="row" style={{ marginBottom: '0' }}>
                    <RadioButtonGroup
                      name="pLoanApplicationHositoryExists"
                      id="pLoanApplicationHositoryExists"
                      defaultSelected="0"
                      className="col"
                      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                      <RadioButton
                        value="1"
                        label="เคย"
                        style={{ display: 'inline-block', width: '50%' }}
                        readOnly
                      />
                      <RadioButton
                        value="0"
                        label="ไม่เคย"
                        style={{ display: 'inline-block', width: '50%' }}
                        readOnly
                      />
                    </RadioButtonGroup>
                  </div>
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลส่วนตัว"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    floatingLabelText="วันที่คำขอ"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="dateReq"
                    name="dateReq"
                    floatingLabelText="คำนำหน้าชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="firstNameTH"
                    name="firstNameTH"
                    floatingLabelText="ชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="lastNameTH"
                    name="lastNameTH"
                    floatingLabelText="นามสกุล (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="lastNameTH"
                    name="lastNameTH"
                    floatingLabelText="คำนำหน้าชื่อ (EN)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="firstNameEN"
                    name="firstNameEN"
                    floatingLabelText="ชื่อ (EN)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="lastNameEN"
                    name="lastNameEN"
                    floatingLabelText="นามสกุล (EN)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="lastNameEN"
                    name="lastNameEN"
                    floatingLabelText="เลขบัตรประชาชน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="lastNameEN"
                    name="lastNameEN"
                    floatingLabelText="วันหมดอายุบัตรประชาชน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="lastNameEN"
                    name="lastNameEN"
                    floatingLabelText="สถานภาพสมรส"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลการทำงาน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="department"
                    name="department"
                    floatingLabelText="แผนก / ฝ่าย"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="position"
                    name="position"
                    floatingLabelText="ตำแหน่ง"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <TextField
                    id="workTel"
                    name="workTel"
                    floatingLabelText="โทรศัพท์ที่ทำงาน (เบอร์ตรง)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="telExtension"
                    name="telExtension"
                    floatingLabelText="เบอร์ต่อ"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ที่อยู่ปัจจุบัน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="บ้านเลขที่"
                    maxLength="10"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingAlley"
                    name="shippingAlley"
                    floatingLabelText="หมู่ที่"
                    maxLength="3"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="shippingVillage"
                    name="shippingVillage"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingSoi"
                    name="shippingSoi"
                    floatingLabelText="ซอย"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingRoad"
                    name="shippingRoad"
                    floatingLabelText="ถนน"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="จังหวัด"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="อำเภอ / เขต"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="ตำบล / แขวง"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="รหัสไปรษณีย์"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ที่อยู่ตามทะเบียนบ้าน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="บ้านเลขที่"
                    maxLength="10"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingAlley"
                    name="shippingAlley"
                    floatingLabelText="หมู่ที่"
                    maxLength="3"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="shippingVillage"
                    name="shippingVillage"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingSoi"
                    name="shippingSoi"
                    floatingLabelText="ซอย"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingRoad"
                    name="shippingRoad"
                    floatingLabelText="ถนน"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="จังหวัด"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="อำเภอ / เขต"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="ตำบล / แขวง"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="รหัสไปรษณีย์"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="ข้อมูลติดต่อ"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col" >
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col" >
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="เบอร์โทรศัพท์บ้าน"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col" >
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="ผ่อนชำระ / ค่าเช่าต่อเดือน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col" >
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="สถานภาพที่อยู่อาศัย"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="บุคคลอ้างอิง 1"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <TextField
                    id="ref1Firstname"
                    name="ref1Firstname"
                    floatingLabelText="ชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref1Firstname"
                    name="ref1Firstname"
                    floatingLabelText="ชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref1Lastname"
                    name="ref1Lastname"
                    floatingLabelText="นามสกุล (TH)"
                    readOnly
                    fullWidth
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <TextField
                    id="ref1Mobile"
                    name="ref1Mobile"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref1Mobile"
                    name="ref1Mobile"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref1WorkTelephone"
                    name="ref1WorkTelephone"
                    floatingLabelText="เบอร์โทรศัพท์ที่ทำงาน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref1HomeTelephone"
                    name="ref1HomeTelephone"
                    floatingLabelText="เบอร์โทรศัพท์บ้าน"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="บุคคลอ้างอิง 2"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col-4">
                  <TextField
                    floatingLabelText="ชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref2Firstname"
                    name="ref2Firstname"
                    floatingLabelText="ชื่อ (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-4">
                  <TextField
                    id="ref2Lastname"
                    name="ref2Lastname"
                    floatingLabelText="นามสกุล (TH)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <TextField
                    id="ref2Mobile"
                    name="ref2Mobile"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref2Mobile"
                    name="ref2Mobile"
                    floatingLabelText="เบอร์โทรศัพท์มือถือ"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref2WorkTelephone"
                    name="ref2WorkTelephone"
                    floatingLabelText="เบอร์โทรศัพท์ที่ทำงาน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="ref2HomeTelephone"
                    name="ref2HomeTelephone"
                    floatingLabelText="เบอร์โทรศัพท์บ้าน"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="สถานที่จัดส่งเอกสาร"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingHouseNo"
                    name="shippingHouseNo"
                    floatingLabelText="บ้านเลขที่"
                    maxLength="10"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingAlley"
                    name="shippingAlley"
                    floatingLabelText="หมู่ที่"
                    maxLength="3"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingFloor"
                    name="shippingFloor"
                    floatingLabelText="ชั้น"
                    maxLength="3"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TextField
                    id="shippingVillage"
                    name="shippingVillage"
                    floatingLabelText="ชื่อหมู่บ้าน / อาคาร"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingSoi"
                    name="shippingSoi"
                    floatingLabelText="ซอย"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingRoad"
                    name="shippingRoad"
                    floatingLabelText="ถนน"
                    maxLength="100"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="จังหวัด"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="อำเภอ / เขต"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="ตำบล / แขวง"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextField
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    floatingLabelText="รหัสไปรษณีย์"
                    maxLength="5"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="เอกสารเพิ่มเติม"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div className="col">
                  <TextField
                    id="fileName0"
                    name="fileName0"
                    floatingLabelText="สำเนาบัตรประชาชน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="fileName1"
                    name="fileName1"
                    floatingLabelText="สลิปเงินเดือน (เดือนล่าสุด)"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <TextField
                    id="fileName2"
                    name="fileName2"
                    floatingLabelText="สำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="fileName3"
                    name="fileName3"
                    floatingLabelText="ทะเบียนบ้าน"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <TextField
                    id="fileName4"
                    name="fileName4"
                    floatingLabelText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #1"
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col">
                  <TextField
                    id="fileName5"
                    name="fileName5"
                    floatingLabelText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #2"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <TextField
                    id="fileName6"
                    name="fileName6"
                    floatingLabelText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #3"
                    fullWidth
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  รายละเอียดเอกสารที่ต้องแนบ <br />
                  - สำเนาเอกสารที่แนบต้องไม่มีการลงนามรับรองสำเนาถูกต้อง
                  โดยทาง ธนาคารจะจัดเตรียมเอกสารเพื่อให้ท่านทำการลงนามอีกครั้งในภายหลัง <br />
                  - สำเนาเอกสารต้องชัดเจน ไม่ซีดจางหรือเข้มดำ <br />
                  - สำเนาบัตรประชาชน
                  ต้องเป็นสำเนาของบัตรประชาชนที่เป็นปัจจุบันและไม่หมดอายุ <br />
                  - สำเนาทะเบียนบ้านต้องประกอบด้วยหน้าแรกที่มีที่อยู่
                  และหน้าที่มีชื่อของผู้ขอสินเชื่อ <br />
                  - สลิปเงินเดือนต้องเป็นสลิปเงินเดือนล่าสุด
                  มีชื่อผู้ขอสินเชื่อ วันที่ และชื่อบริษัทที่สังกัดชัดเจน <br />
                  - สำเนาบัญชีเงินฝากที่ใช้รับเงินเดือน
                  แสดงรายได้ย้อนหลัง 6 เดือนนับจากปัจจุบัน
                    จะต้องแสดงรายละเอียดของเงินเข้าออก
                    และแสดงรายได้ที่มาจากเงินเดือนครบทั้ง 6 เดือน โดยสามารถใช้ <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- สำเนาจากสมุดบัญชีเล่มจริง หรือ <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- สำเนารายการเดินบัญชีจากระบบ
                    online (online statement)
                      โดยจะต้องมีระบุ ชื่อบัญชี เลขที่บัญชี และธนาคารชัดเจน <br />
                  - กรณีลูกค้าได้รับอนุมัติสินเชื่อ ธนาคารจะนำส่งเงินหลัง
                    หักค่าอากรแสตมป์ติดสัญญาและค่าใช้จ่ายอื่นๆตามที่ธนาคารประะกาศ
                    /กำหนด เข้าบัญชีตามสำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน
                    และใช้บัญชีเงินฝากดังกล่าวในการสมัครบริการหักบัญชีเงินฝากอัตโนมัติ
                    เพื่อชำระสินเชื่อรายเดือน <br />
                  - ธนาคารขอสงวนสิทธิ์ในการขอเอกสารประกอบการพิจารณาสินเชื่อเพิ่มเติมในบางกรณี
                </div>
              </div>
            </CardText>
          </Card>

          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนส่งคำขอกู้"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText />
          </Card>

          <div className="row">
            <div className="col">
              ข้าพเจ้ารับทราบและเข้าใจข้อมูล เงื่อนไขผลิตภัณฑ์สินเชื่อ
              และประสงค์จะขอสินเชื่อกับธนาคารเกียรตินาคิน จำกัด (มหาชน)
              ทั้งนี้ ข้าพเจ้าได้ตรวจสอบความถูกต้องของข้อมูลในเอกสารประกอบการ
              ขอสินเชื่อที่แนบมาทั้งหมดนี้แล้ว
              และขอรับรองว่าข้อมูลทั้งหมดในเอกสารดังกล่าวเป็นจริง
              ถูกต้อง และเป็นปัจจุบันในทุกประการ
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Checkbox
                label="ฉันยินยอมข้อตกลงและเงื่อนไขการใช้บริการ"
                checked={isConsent}
                style={styles.checkbox}
                onCheck={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="กลับ"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                onClick={this.handleBack}
              />
              <RaisedButton
                type="submit"
                label="ดำเนินการต่อ"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!isConsent}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
                onClick={this.handleNext}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Summary);
