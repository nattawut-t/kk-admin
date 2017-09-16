import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  // CardActions,
  CardHeader,
  // CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

const Viewer = ({
  accountNo,
  accountName,
  idcardNo,
  partnerName,
  bankCode,
  bankName,
  branchName,
}) => (
  <Card>
    <CardHeader
      title="Bank Account"
      subtitle="Detail for verification"
      avatar="images/jsa-128.jpg"
    />
    <CardTitle title={`Account No.: ${accountNo}`} subtitle={`Account Name: ${accountName}`} />
    <CardText>
      <div className="pt-form-group">
        <div className="pt-label">
          Customer Information:
      </div>
        <div className="pt-form-content">
          <span>{idcardNo} {partnerName}</span>
          <div className="pt-form-helper-text">Identity card no. and name of customer</div>
        </div>
      </div>
      <div className="pt-form-group">
        <div className="pt-label">
          Bank Information:
      </div>
        <div className="pt-form-content">
          <span>{bankName} {bankCode ? `(${bankCode})` : ''} {branchName ? ` / ${branchName}` : ''}</span>
          <div className="pt-form-helper-text">Identity card no. and name of customer</div>
        </div>
      </div>
    </CardText>
  </Card>
);

Viewer.propTypes = {
  accountNo: PropTypes.string,
  accountName: PropTypes.string,
  idcardNo: PropTypes.string,
  partnerName: PropTypes.string,
  bankCode: PropTypes.string,
  bankName: PropTypes.string,
  branchName: PropTypes.string,
};

Viewer.defaultProps = {
  accountNo: '',
  accountName: '',
  idcardNo: '',
  partnerName: '',
  bankCode: '',
  bankName: '',
  branchName: '',
};

export default Viewer;
