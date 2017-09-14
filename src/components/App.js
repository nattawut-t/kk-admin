import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import FilterList from 'material-ui/svg-icons/content/filter-list';

import ProductInfo from './ProductInfo';
import BorrowStatus from './BorrowStatus';
import Main from './Main';
import Login from '../containers/Login';
import AdminLogin from '../containers/AdminLogin';
import History from './History';
import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import Summary from '../containers/lead/Summary';
import Test from './test/Test';

const pathList = [
  '/borrow-request',
  '/product-info',
  '/borrow-status',
  '/history',
  '/summary',
  '/additional-info',
  '/loan-info',
  '/personal-info',
  '/borrow-request',
];

class App extends React.Component {
  state = {
    open: false,
  };

  componentWillMount() {
    const width = document.body.offsetWidth;
    this.setState({ open: width > 768 });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ open: nextProps.width === LARGE });
    }
  }

  handleToggle() {
    const width = document.body.offsetWidth;
    this.setState({ open: width > 768 || !this.state.open });
  }

  render() {
    const { location, isAdmin } = this.props;
    const { open } = this.state;
    const isMatched = isAdmin || pathList.indexOf(location.pathname) !== -1;

    console.log('>>> isAdmin: ', isAdmin, isMatched, location.pathname);

    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
              title=""
              className={`${!isMatched ? 'pc-hide' : ''}`}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onClick={() => this.handleToggle()}
            />
            <main>
              <div className="row">
                <div className={`${!isMatched ? 'col-0' : 'col-3'}`} style={{ margin: 'inherit' }}>

                  <Drawer
                    docked
                    className={`${!isMatched ? 'pc-hide' : ''}`}
                    open={open}
                    width={250}
                  >
                    <AppBar
                      title="MoneyTable"
                      className={`${!isMatched ? 'pc-hide' : ''}`}
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onClick={() => this.handleToggle()}
                    />

                    {isAdmin
                      ? <Menu>
                        <MenuItem
                          primaryText="เพิ่มคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<PersonAdd />}
                        />
                        <MenuItem
                          primaryText="รายการคำขอสินเชื่อ"
                          leftIcon={<FilterList />}
                        />
                      </Menu>
                      : <Menu>
                        <MenuItem
                          primaryText="ส่งคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<PersonAdd />}
                        />
                        <MenuItem
                          primaryText="ข้อมูลผลิตภัณฑ์"
                          containerElement={<Link to="/product-info" />}
                          leftIcon={<RemoveRedEye />}
                        />
                        <Divider />
                        <MenuItem
                          primaryText="สถานะการกู้"
                          containerElement={<Link to="/borrow-status" />}
                          leftIcon={<ContentLink />}
                        />
                        <MenuItem
                          primaryText="ประวัติการกู้"
                          containerElement={<Link to="/history" />}
                          leftIcon={<ContentCopy />}
                        />
                      </Menu>
                    }

                  </Drawer>

                </div>
                <div className={`${!isMatched ? 'col-12' : 'col-9'}`}>
                  <div className="container">
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/admin/login" component={AdminLogin} />
                      <Route path="/borrow-request" component={Main} />
                      <Route path="/product-info" component={ProductInfo} />
                      <Route path="/borrow-status" component={BorrowStatus} />
                      <Route path="/history" component={History} />
                      <Route path="/summary" component={Summary} />
                      <Route path="/additional-info" component={AdditionalInfo} />
                      <Route path="/test" component={Test} />
                      <Route path="/loan-info" component={LoanInfo} />
                      <Route path="/personal-info" component={PersonalInfo} />
                      <Route path="/borrow-request" component={Agreement} />
                      <Route path="*" exact component={Login} />
                    </Switch>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </MuiThemeProvider>
      </Router>);
  }
}

App.propTypes = {
  // history: PropTypes.object.isRequired,
  width: PropTypes.number,
  location: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

App.defaultProps = {
  width: 1000,
  isAdmin: false,
};

export default withWidth()(withRouter(App));
