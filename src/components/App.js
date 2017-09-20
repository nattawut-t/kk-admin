import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  // Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Divider from 'material-ui/Divider';
// import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import List from 'material-ui/svg-icons/action/list';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import LinearScale from 'material-ui/svg-icons/editor/linear-scale';

import ProductInfo from './ProductInfo';
import BorrowStatus from './BorrowStatus';
import Main from './Main';
import Login from '../containers/Login';
import AdminLogin from '../containers/AdminLogin';
// import History from './History';
import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import Summary from '../containers/lead/Summary';

import AdminIndex from '../containers/admin/Index';
import UserIndex from '../containers/lead/Index';

const Logged = ({ onSignoutClick }) => (
  <div>
    <IconButton><AccountCircle /></IconButton>
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText="ออกจากระบบ"
        onClick={() => onSignoutClick()}
      />
    </IconMenu>
  </div>
);

Logged.propTypes = {
  onSignoutClick: PropTypes.func.isRequired,
};

class App extends React.Component {
  state = {
    open: false,
    afterLogin: false,
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

  handleToggle = () => {
    const width = document.body.offsetWidth;
    this.setState({ open: width > 768 || !this.state.open });
  };

  handleSignoutClick = () => {
    location.href = '/';
  };

  render() {
    const { authenticated, isAdmin } = this.props;

    if (!authenticated) {
      return (
        <Router>
          <MuiThemeProvider>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="*" exact component={Login} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      );
    }

    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
              title=""
              className={`${!authenticated ? 'pc-hide' : ''}`}
              iconElementRight={<Logged onSignoutClick={this.handleSignoutClick} />}
              onClick={() => this.handleToggle()}
            />
            <main>
              <div className="row">
                <div
                  className={`${!authenticated ? 'col-0' : 'col-3'}`}
                  style={{ margin: 'inherit' }}
                >
                  <Drawer
                    docked
                    className={`${!authenticated ? 'pc-hide' : ''}`}
                    open={this.state.open}
                    width={250}
                  >
                    <AppBar
                      title="MoneyTable"
                      className={`${!authenticated ? 'pc-hide' : ''}`}
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onClick={() => this.handleToggle()}
                    />

                    {isAdmin
                      ? <Menu>
                        <MenuItem
                          primaryText="เพิ่มคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<LibraryBooks />}
                        />
                        <MenuItem
                          primaryText="รายการคำขอสินเชื่อ"
                          containerElement={<Link to="/admin/leads" />}
                          leftIcon={<List />}
                        />
                      </Menu>
                      : <Menu>
                        <MenuItem
                          primaryText="ส่งคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<LibraryBooks />}
                        />
                        <MenuItem
                          primaryText="ข้อมูลผลิตภัณฑ์"
                          containerElement={<Link to="/product-info" />}
                          leftIcon={<RemoveRedEye />}
                        />
                        <Divider />
                        <MenuItem
                          primaryText="สถานะการกู้"
                          containerElement={<Link to="/leads" />}
                          leftIcon={<LinearScale />}
                        />
                      </Menu>
                    }

                  </Drawer>

                </div>
                <div className={`${!authenticated ? 'col-12' : 'col-9'}`}>
                  <div className="container">
                    <Switch>
                      <Route path="/product-info" component={ProductInfo} />
                      <Route path="/borrow-request" component={Main} />
                      <Route path="/borrow-status" component={BorrowStatus} />
                      <Route path="/summary" component={Summary} />
                      <Route path="/additional-info" component={AdditionalInfo} />
                      <Route path="/loan-info" component={LoanInfo} />
                      <Route path="/personal-info" component={PersonalInfo} />
                      <Route path="/borrow-request" component={Agreement} />
                      <Route path="/leads" component={UserIndex} />
                      <Route path="/admin/leads" component={AdminIndex} />
                      <Route path="*" exact component={ProductInfo} />
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
  // location: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool,
};

App.defaultProps = {
  width: 1000,
  authenticated: false,
};

export default withWidth()(withRouter(App));
