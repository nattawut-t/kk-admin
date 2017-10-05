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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import List from 'material-ui/svg-icons/action/list';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import LinearScale from 'material-ui/svg-icons/editor/linear-scale';

import ProductInfo from './ProductInfo';
import Main from './Main';
import Login from '../containers/Login';
import AdminLogin from '../containers/AdminLogin';
import AdminIndex from '../containers/admin/Index';
import Index from '../containers/lead/Index';
import Landing from './Landing';

import { isAdmin } from '../libs/config';
import Logo from '../../assets/asset-1-4-x@3x.png';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(1, 155, 201)',
  },
});
const styles = {
  AppBar: {
    position: 'fixed',
    top: 0,
    boxShadow: 'none',
  },
  AppBarSideBar: {
    backgroundColor: '#ffffff',
    boxShadow: 'none',
  },
  Drawer: {
    boxShadow: 'none',
    borderRight: '1px solid #eee',
  },
  Logo: {
    height: '60px',
    position: 'absolute',
    top: '5px',
    left: '0',
    right: '0',
    margin: 'auto',
  },
  MenuItem: {
    padding: '5px 0px',
  },
  smallIcon: {
    width: 36,
    height: 36,
  },
  IconButtonSideBar: {
    padding: 0,
    top: '3px',
  },
};

const Logged = ({ onSignoutClick }) => (
  <div>
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon color="#ffffff" /></IconButton>
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
    localStorage.clear();
    location.href = '/';
  };

  render() {
    const authenticated = localStorage.getItem('token');
    const _isAdmin = isAdmin();

    if (!authenticated) {
      return (
        <Router>
          <MuiThemeProvider>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="*" exact component={Landing} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      );
    }

    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar
              title=""
              className={`${!authenticated ? 'pc-hide' : ''}`}
              iconElementRight={<Logged onSignoutClick={this.handleSignoutClick} />}
              iconStyleRight={{ color: '#101010' }}
              onClick={() => this.handleToggle()}
              style={styles.AppBar}
            />
            <main>
              <div className={`${!authenticated ? 'row' : 'main-container'}`}>
                <div
                  className={`${!authenticated ? 'col-0' : 'sidebar'}`}
                  style={{ margin: 'inherit' }}
                >
                  <Drawer
                    docked
                    className={`${!authenticated ? 'pc-hide' : ''}`}
                    open={this.state.open}
                    width={250}
                    containerStyle={styles.Drawer}
                  >

                    <AppBar
                      title={<img src={Logo} alt="Logo" style={styles.Logo} />}
                      className={`${!authenticated ? 'pc-hide' : ''}`}
                      iconElementLeft={
                        <IconButton style={styles.IconButtonSideBar} iconStyle={styles.smallIcon} >
                          <NavigationMenu color="#019bc9" />
                        </IconButton>
                      }
                      onClick={() => this.handleToggle()}
                      style={styles.AppBarSideBar}
                    />

                    {_isAdmin
                      ? <Menu>
                        <MenuItem
                          primaryText="เพิ่มคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<LibraryBooks />}
                          style={styles.MenuItem}
                        />
                        <MenuItem
                          primaryText="รายการคำขอสินเชื่อ"
                          containerElement={<Link to="/admin/leads" />}
                          leftIcon={<List />}
                          style={styles.MenuItem}
                        />
                      </Menu>
                      : <Menu>
                        <MenuItem
                          primaryText="ส่งคำขอสินเชื่อ"
                          containerElement={<Link to="/borrow-request" />}
                          leftIcon={<LibraryBooks />}
                          style={styles.MenuItem}
                        />
                        <MenuItem
                          primaryText="ข้อมูลผลิตภัณฑ์"
                          containerElement={<Link to="/product-info" />}
                          leftIcon={<RemoveRedEye />}
                          style={styles.MenuItem}
                        />
                        <Divider />
                        <MenuItem
                          primaryText="สถานะการกู้"
                          containerElement={<Link to="/leads" />}
                          leftIcon={<LinearScale />}
                          style={styles.MenuItem}
                        />
                      </Menu>
                    }

                  </Drawer>

                </div>
                <div className={`${!authenticated ? 'col-12' : 'contain'}`}>
                  <Switch>
                    <Route path="/borrow-request" component={Main} />
                    <Route path="/leads" component={Index} />
                    <Route path="/admin/leads" component={AdminIndex} />
                    <Route path="*" exact component={ProductInfo} />
                  </Switch>
                </div>
              </div>
            </main>
          </div>
        </MuiThemeProvider>
      </Router>);
  }
}

App.propTypes = {
  width: PropTypes.number,
};

App.defaultProps = {
  width: 1000,
  authenticated: false,
};

export default withWidth()(withRouter(App));
