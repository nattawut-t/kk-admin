import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from '../../assets/artboard-1-copy-2@3x.png';
import KKProductInfoPdf from '../../assets/kk-ploan-factsheet.pdf';

const ProductInfo = () => (
  <div className="landing--container">
    <div className="landing--container--box">
      <h1 className="landing--title">สิทธิประโยชน์<br />สำหรับพนักงานบริษัท</h1>
      <div className="landing--text landing--text--lg">วันนี้คุณสามารถขอสินเชื่อออนไลน์ได้<span className="mbr">ผ่านระบบมันนี่เทเบิล</span></div>
      <div className="landing--text landing--text--primary landing--text--desktop">
        <ul className="landing--list">
          <li>ใช้ง่าย</li>
          <li>สะดวก</li>
          <li>ปลอดภัย</li>
        </ul>
      </div>
      <div className="landing--group--g1">
        <div className="landing--text">คุณได้รับสิทธิใช้บริการเนื่องจากคุณอยู่ในบริษัท<span className="mbr">ที่เป็นพันธมิตรกับเรา</span></div>
        <Link to="/borrow-request" className="landing--btn">ส่งคำขอสินเชื่อผ่านระบบ</Link>
      </div>
      <div className="landing--text landing--text--primary landing--text--mobile">
        <ul className="landing--list">
          <li>ใช้ง่าย</li>
          <li>สะดวก</li>
          <li>ปลอดภัย</li>
        </ul>
      </div>
      <div className="landing--logo-poster">
        <div className="landing--logo-poster--bg">
          <div className="landing--logo-poster--info">
            <img className="landing--logo-poster--info--logo m-inline" src={Logo} alt="Logo" />
            <div className="landing--text landing--text--lg m-inline">มันนี่เทเบิลคืออะไร</div>
            <div className="landing--text landing--logo-poster--desc">มันนี่เทเบิลคือระบบแพลตฟอร์มที่ให้บริการในการจัดการสินเชื่อระหว่างผู้ให้สินเชื่อที่น่าเชื่อถือกับผู้รับสินเชื่อ </div>
            <Link to={KKProductInfoPdf} target="_blank" className="landing--link landing--text">อ่านข้อมูลผลิตภัณฑ์</Link>
          </div>
        </div>
      </div>
      <div className="landing--text--bottom">
        <div className="landing--text landing--text--primary">* การพิจารณาและอนุมัติสินเชื่อ หรืออัตราดอกเบี้ยของสินเชื่อแต่ละประเภทเป็นไปตามเงื่อนไขที่ผู้ให้สินเชื่อที่น่าเชื่อถือเป็นผู้กำหนด</div>
      </div>
      <div className="landing--text landing--text--copyright">
        © 2017 Money.work | All rights reserved.
      </div>
    </div>
  </div>
);

export default withRouter(ProductInfo);
