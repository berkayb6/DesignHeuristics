import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
