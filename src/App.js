import React from 'react';
import './App.css';
import Router from "./router";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="app">
  <Router/>
    </div>)
  }
}

export default App;

