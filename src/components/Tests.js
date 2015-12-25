import React from 'react';
import Paper from 'material-ui/lib/paper';
import Form from './Form';
import {Styles} from 'material-ui';

const ThemeManager = Styles.ThemeManager;
import myTheme from './myTheme.js';

const Tests = React.createClass({
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
      <Paper style={{width: '60%', margin: '100px auto', padding: '30px 0'}}>
        <Form/>
      </Paper>
    );
  }
});

export default Tests;
