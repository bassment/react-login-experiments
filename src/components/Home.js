import React from 'react';
import Counter from './Counter';
import style from './Home.css';

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
      <section className={style.section}>
        <Counter
          count={this.state.counter}
          onIncrement={this.increment}
        />
      </section>
    );
  }
});

export default Home;
