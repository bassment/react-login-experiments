import React from 'react';
import MenuBar from './MenuBar.js';
import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import {Styles} from 'material-ui';
import LeftBar from './LeftBar';
import myTheme from './myTheme.js';

const ThemeManager = Styles.ThemeManager;

const App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    children: React.PropTypes.node.isRequired,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  componentWillMount() {
    let setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 680)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme)
    };
  },

  onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },

  getAppBar() {
    let title =
       this.props.history.isActive('/') ? 'Home' :
       this.props.history.isActive('/tests') ? 'Tests' : '';

    return (
     <div>
       <AppBar
         onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
         title={title}
         zDepth={0}/>
     </div>);
  },

  render() {
    return (
      <div>
        <AppCanvas>
          {this.state.renderTabs ? <MenuBar history={this.props.history} location={this.props.location}/> : this.getAppBar()}
          <LeftBar ref="leftNav" history={this.props.history} location={this.props.location}/>
          {this.props.children}
        </AppCanvas>
      </div>
    );
  }
});

export default App;
