import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router';
// import Header from "./_Header.jsx";

export default class Layout extends React.Component {
  render() {
    return(
      <div>
        <h1>Layout</h1>
        {this.props.children}

        <Link to="/">Page1</Link>
        <Link to="/page2">Page2</Link>
        <Link to="/page3">Page3</Link>
      </div>
    );
  }
}
