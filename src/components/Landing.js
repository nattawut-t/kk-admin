import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import HeaderLogo from '../../assets/artboard-1-copy-4@3x.png';
import SystemPreview from '../../assets/group@2x.png';

const Landing = ({ history }) =>
  <div className="landing--home">
    <div className="landing--header--logo">
      <img src={HeaderLogo} alt="Lading page logo" />
    </div>
    <div className="row">
      <div className="col-md-5">
        <div className="landing--group--left">
          <div className="landing--group--box">
            <h1 className="landing--title">ยินดีต้อนรับสู่<br />มันนี่เทเบิล</h1>
            <div className="landing--text _clear">
              <ul className="landing--list">
                <li>สะดวก</li>
                <li>ง่าย</li>
                <li>ได้ชัวร์</li>
              </ul>
            </div>
            <input
              type="button"
              value="เข้าสู่ระบบ"
              className="landing--btn landing--btn--main"
              onClick={() => history.push('/login')}
            />
          </div>
        </div>
      </div>
      <div className="col-md-7" style={{ zIndex: '1' }}>
        <div className="landing--index">
          <div className="landing--index--bg">
            <img src={SystemPreview} alt="System preview" />
          </div>
        </div>
      </div>
    </div>
    <div className="landing--text landing--text--copyright">
        © 2017 Money.work | All rights reserved.
    </div>
  </div >;

Landing.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Landing);
