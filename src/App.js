import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">

        {/**
         * This js-file stands at the top and has only a child component "Main".
         * To route between pages the component "Main" should be inside of BrowserRouter
         */}
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
