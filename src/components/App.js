import React, { PropTypes } from 'react';
import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
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

class App extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    width: 1000,
  };

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
    const { location } = this.props;
    const pathList = ['/borrow-request', '/product-info', '/borrow-status',
      '/history', '/summary', '/additional-info', '/loan-info', '/personal-info',
      '/borrow-request'];
    const isMatched = pathList.indexOf(location.pathname) !== -1;
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
                    open={this.state.open}
                    width={250}
                  >
                    <AppBar
                      title="MoneyTable"
                      className={`${!isMatched ? 'pc-hide' : ''}`}
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onClick={() => this.handleToggle()}
                    />
                    <NavLink to="/borrow-request">
                      <MenuItem>ส่งคำขอสินเชื่อ</MenuItem>
                    </NavLink>
                    <NavLink to="/product-info">
                      <MenuItem>ข้อมูลผลิตภัณฑ์</MenuItem>
                    </NavLink>
                    <NavLink to="/borrow-status">
                      <MenuItem>สถานะการกู้</MenuItem>
                    </NavLink>
                    <NavLink to="/history">
                      <MenuItem>ประวัติการกู้</MenuItem>
                    </NavLink>
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

export default withWidth()(withRouter(App));
