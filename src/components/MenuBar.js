import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import Radium from 'radium';
import styles from './MenuBarCSS.js';
import {Styles} from 'material-ui';

const ThemeManager = Styles.ThemeManager;
import myTheme from './myTheme.js';

import {
  Paper,
  EnhancedButton,
  Tabs,
  Tab
} from 'material-ui';

const MenuBar = React.createClass({
  propTypes: {
    history: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      tabIndex: this._getSelectedIndex()
    };
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme)
    };
  },

  _handleTabChange(value, e, tab) {
    this.props.history.pushState(null, tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  },

  _getSelectedIndex() {
    return this.props.history.isActive('/') ? '1' :
       this.props.history.isActive('/tests') ? '2' : '0';
  },

  _goHome() {
    this.props.history.pushState(this.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  },

  render() {
    return (
      <div>
        <Paper style={styles.paper} zDepth={2} rounded={false}>
          <EnhancedButton
            style={styles.button}
            value="1"
            route="/"
            onClick={this._goHome}
            centerRipple>
              <img style={styles.logoImage} src="images/cookie.png" />
              <span style={styles.logoText}>Automate!</span>
          </EnhancedButton>
          <div style={styles.tabsRight}>
            <Tabs style={styles.tabs} value={this.state.tabIndex} onChange={this._handleTabChange}>
              <Tab style={styles.tab} value="1" label="Home" route="/" />
              <Tab style={styles.tab} value="2" label="Tests" route="/tests" />
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }
});

/*eslint-disable */
module.exports = Radium(MenuBar);
