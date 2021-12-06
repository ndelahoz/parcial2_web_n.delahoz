import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {IntlProvider} from 'react-intl'

import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";

const messages = {
  'es': localeEsMessages,
  'en': localeEnMessages
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(

  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
    <App />
    </IntlProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
