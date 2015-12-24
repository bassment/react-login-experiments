import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import {Styles} from 'material-ui';

const ThemeManager = Styles.ThemeManager;
import myTheme from './myTheme.js';

import {
  Paper,
  EnhancedButton,
  Tabs,
  Tab
} from 'material-ui';

const styles = {
  paper: {
    background: '#E64A19',
    height: 64,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 4
  },
  button: {
    left: 24,
    position: 'fixed',
    width: 200
  },
  logoImage: {
    position: 'relative',
    width: 64,
    right: 62
  },
  logoText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 26,
    fontWeight: 500,
    left: 70,
    top: 18
  },
  tabsRight: {
    position: 'absolute',
    right: 60,
    bottom: 0
  },
  tabs: {
    width: 400,
    bottom: 0
  },
  tab: {
    height: 64,
    textTransform: 'uppercase'
  },
  menuIcon: {
    right: 12,
    position: 'absolute',
    top: 8,
    zIndex: 5
  },
  buttonIcon: {
    color: '#fff'
  }
};

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
              <img style={styles.logoImage} src="/images/Logo.png" />
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

export default MenuBar;
