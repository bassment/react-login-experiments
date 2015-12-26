import React from 'react';
import Paper from 'material-ui/lib/paper';
import Form from './Form';
import Helmet from 'react-helmet';

const Tests = React.createClass({
  render() {
    return (
      <div>
        <Helmet title="Tests"/>
        <Paper style={{width: '60%', margin: '100px auto', padding: '30px 0'}}>
          <Form/>
        </Paper>
      </div>
    );
  }
});

export default Tests;
