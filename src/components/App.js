import React from 'react';
import MenuBar from './MenuBar.js';
import AppCanvas from 'material-ui/lib/app-canvas';

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  render() {
    return (
      <AppCanvas>
        <MenuBar history={this.props.history} />
        {this.props.children}
      </AppCanvas>
    );
  }
});

export default App;
