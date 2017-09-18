import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import Redo from 'material-ui/svg-icons/content/redo';
import {
  Card,
  CardActions,
  CardHeader,
  // CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

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

const Viewer = () => (
  <Card>
    <CardHeader
      title="ข้อมูลคำขอกู้"
      subtitle="รายละเอียดคำข้อกู้สำหรับการอนุมัติ"
    />
    <CardTitle
      title="ข้อมูลคำขอกู้"
      subtitle=""
    />
    <CardText />
    <CardActions>
      <div className="row">
        <div
          className="col-12"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <RaisedButton
            label="อนุมัติ"
            primary
            style={styles.button}
            icon={<Done />}
          />
          <RaisedButton
            label="ปฏิเสธ"
            secondary
            style={styles.button}
            icon={<Clear />}
          />
          <RaisedButton
            label="ส่งกู้รายอื่น"
            style={styles.button}
            icon={<Redo />}
          />
        </div>
      </div>
    </CardActions>
  </Card>
);

Viewer.propTypes = {
  // personalInfo: PropTypes.object.isRequired,
  // loanInfo: PropTypes.object.isRequired,
  // additionalInfo: PropTypes.object.isRequired,
};

Viewer.defaultProps = {
};

export default withRouter(Viewer);
