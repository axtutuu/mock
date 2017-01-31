import React from 'react';
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// pages
import Layout from "./components/_Layout.jsx";
import Page1 from './components/_Page1.jsx';
import Page2 from './components/_Page2.jsx';
import Page3 from './components/_Page3.jsx';


const app = document.getElementById('app');
ReactDOM.render(
  <Router history={appHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Page1} />
      <Route path="page2" component={Page2} />
      <Route path="page3" component={Page3} />
    </Route>
  </Router>,
app);
