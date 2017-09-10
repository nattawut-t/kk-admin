import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import KKProductInfoImg from '../../assets/kk-product-info.jpg';
import KKProductInfoPdf from '../../assets/kk-ploan-factsheet.pdf';

const styles = {
  button: {
    margin: 12,
  },
};

class ProductInfo extends Component {
  render() {
    return (
      <div className="row" style={{ textAlign: 'center' }}>
        <div className="col-12">
          <img alt="ProductInfo" src={KKProductInfoImg} style={{ width: '100%' }} />
        </div>
        <div className="col-12">
          <a href={KKProductInfoPdf} download="ploan-factsheet.pdf">
            <RaisedButton
              label="ดาวน์โหลด Factsheet สินเชื่อส่วนบุคคล"
              labelPosition="before"
              primary
              style={styles.button}
              icon={<FontIcon className="muidocs-icon-custom-github" />}
              onClick={this.handleNext}
            />
          </a>
          <NavLink to="/borrow-status">
            <RaisedButton
              label="สนใจส่งคำขอสินเชื่อส่วนบุคคล"
              labelPosition="before"
              primary
              style={styles.button}
              icon={<FontIcon className="muidocs-icon-custom-github" />}
              onClick={this.handleNext}
            />
          </NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductInfo);
