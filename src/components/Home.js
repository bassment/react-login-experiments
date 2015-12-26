import React from 'react';
import Counter from './Counter';
import style from './Home.css';
import Paper from 'material-ui/lib/paper';
import Form from './Form';
import Helmet from 'react-helmet';

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
      <div>
        <Helmet title="Automate!"/>
        <Paper style={{width: '60%', margin: '100px auto 0'}}>
          <section className={style.section}>
            <Counter
              count={this.state.counter}
              onIncrement={this.increment}
            />
          </section>
        </Paper>
      </div>
    );
  }
});

export default Home;
