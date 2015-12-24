import React, {PropTypes} from 'react';
import MenuBar from './MenuBar.js';
import AppCanvas from 'material-ui/lib/app-canvas';

const App = ({children}) =>

  <div>
    <AppCanvas>
      <MenuBar />
      {children}
    </AppCanvas>
  </div>;

App.propTypes = typeof __DEV__ && {
  children: PropTypes.object.isRequired
};

export default App;
