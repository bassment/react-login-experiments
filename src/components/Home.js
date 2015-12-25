import React from 'react';
import Counter from './Counter';
import style from './Home.css';
import Paper from 'material-ui/lib/paper';
import Form from './Form';
import {Styles} from 'material-ui';

const ThemeManager = Styles.ThemeManager;
import myTheme from './myTheme.js';

const Home = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      counter: 0
    };
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme)
    };
  },

  increment() {
    this.setState({
      counter: this.state.counter += 1
    });
  },

  render() {
    return (
      <Paper style={{width: '60%', margin: '100px auto 0'}}>
        <section className={style.section}>
          <Counter
            count={this.state.counter}
            onIncrement={this.increment}
          />
        </section>
      </Paper>
    );
  }
});

export default Home;
