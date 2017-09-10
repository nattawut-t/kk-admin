import React, { PropTypes } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import LeadStep from './lead/LeadStep';
import Test from './test/Test';

class App extends React.Component {
  static propTypes = {
    width: PropTypes.number,
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
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
              title=""
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onClick={() => this.handleToggle()}
            />
            <main>
              <div className="row">
                <div className="col-3" style={{ margin: 'inherit' }}>
                  <Drawer
                    docked
                    open={this.state.open}
                    width={250}
                  >
                    <AppBar
                      title="MoneyTable"
                      iconClassNameRight="muidocs-icon-navigation-expand-more"
                      onClick={() => this.handleToggle()}
                    />
                  </Drawer>
                </div>
                <div className="col-9">
                  <div style={{ float: 'none', margin: '0 auto' }}>
                    <LeadStep />
                  </div>
                  <div className="container">
                    <Switch>
                      <Route path="/additional-info" component={AdditionalInfo} />
                      <Route path="/test" component={Test} />
                      <Route path="/loan-info" component={LoanInfo} />
                      <Route path="/personal-info" component={PersonalInfo} />
                      <Route path="/" component={Agreement} />
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

export default withWidth()(App);
