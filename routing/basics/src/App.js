import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'

const App = props => {
  return (
    <Router>
      <div
        className='ui text container'
      >
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>

        <ul>
          <li>
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <code>/pacific</code>
            </Link>
          </li>
          <li>
            <Link to='/black-sea'>
              <code>/black-sea</code>
            </Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route path='/' render={() => <h3>welcome, select a body of saline water above</h3>} exact />
          <Route path='/atlantic/ocean' render={() => <div>
            <h3>Atlantic Ocean - Again!</h3>
            <p>Also known as 'the pond'</p>
          </div>} />
          <Route path='/atlantic' component={Atlantic} />
          <Route path='/pacific' component={Pacific} />
          <Route path='/black-sea' component={BlackSea} />
          <Route render={({ location }) => <div className='ui inverted red segment'>
            <h3>error! no matches for <code>{location.pathname}</code></h3>
          </div>} />
        </Switch>

      </div>
    </Router>
  );
}

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

class BlackSea extends React.Component {
  state = {
    counter: 3
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter - 1
      }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return <div>
      <h3>Black sea</h3>
      <p>Nothing to sea [sic] here ....</p>
      <p>Redirecting in {this.state.counter}...</p>
      {this.state.counter < 1 ? <Redirect to='/' /> : null}
    </div>
  }
}

export default App;
