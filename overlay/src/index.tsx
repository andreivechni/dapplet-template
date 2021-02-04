import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// LP:  7. Change by adding Share State HOC
import App, { IState } from './App';
import { dappletState } from '@dapplets/dapplet-overlay-bridge';

const DappletState = dappletState<IState>(App);

ReactDOM.render(
  <React.StrictMode><DappletState/></React.StrictMode>,
  document.getElementById('root'),
);
// LP end
