import React, { Component } from "react";
import "./Easy.css";

class Easy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <button className="minusButton" onClick={this.decrement}>
          Decrement
        </button>
        <button className="plusButton" onClick={this.increment}>
          Increment
        </button>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}

export default Easy;
