import React from "react";

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.callback(title);
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <h1>{this.props.title}</h1>
        <input onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
