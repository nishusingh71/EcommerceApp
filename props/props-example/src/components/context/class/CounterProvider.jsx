import React, { Component } from "react";
import { initialstate, store } from "./store";
export default class CounterProvider extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }
  increment = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  decrement = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };
  render() {
    return (
      <store.Provider
        value={
          {
          ...initialstate,
          counter: this.state.counter,
          increment: this.increment,
          decrement: this.decrement,
        }
      }
      >
        {this.props.children}
      </store.Provider>
    );
  }
}
