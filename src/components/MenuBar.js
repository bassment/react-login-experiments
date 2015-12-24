import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import {Styles} from 'material-ui';
import Radium from 'radium';
import styles from './MenuBarCSS.js';

const ThemeManager = Styles.ThemeManager;
import myTheme from './myTheme.js';

import {
  Paper,
  EnhancedButton,
  Tabs,
  Tab
} from 'material-ui';

const MenuBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme)
    };
  },

  render() {
    return (
      <div>
        <Paper style={styles.paper} zDepth={2} rounded={false}>
          <EnhancedButton
            style={styles.button}
            centerRipple>
              <img style={styles.logoImage} src="images/cookie.png" />
              <span style={styles.logoText}>Automate!</span>
          </EnhancedButton>
          <div style={styles.tabsRight}>
            <Tabs style={styles.tabs}>
              <Tab style={styles.tab} label="t3kit" />
              <Tab style={styles.tab} label="Meda" />
              <Tab style={styles.tab} label="Visit Sweden" />
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }
});

/*eslint-disable */
module.exports = Radium(MenuBar);
