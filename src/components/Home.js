import React from 'react';
import Counter from './Counter';
import style from './Home.css';
import Paper from 'material-ui/lib/paper';

const Home = React.createClass({

  getInitialState() {
    return {
      counter: 0
    };
  },

  increment() {
    this.setState({
      counter: this.state.counter += 1
    });
  },

  render() {
    return (
      <Paper style={{marginTop: '100px'}}>
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
